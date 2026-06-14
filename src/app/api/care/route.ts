import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import prisma from '@/lib/prisma';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, plantId, location, lightLevel, wateringHabit } = await req.json();

    // Fetch the product care specifications from database if plantId is provided
    let plantDetails = null;
    if (plantId) {
      plantDetails = await prisma.product.findUnique({
        where: { id: plantId },
        select: {
          name: true,
          careLevel: true,
          lightReq: true,
          waterReq: true,
          petFriendly: true,
          description: true
        }
      });
    }

    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

    // Construct a rich system prompt that includes the plant specs
    let systemPrompt = `You are the Expert Horticulturist AI at IndoorPlant.in.
Your mission is to provide extremely helpful, precise, and actionable plant care guides and answer follow-up questions.

`;

    if (plantDetails) {
      systemPrompt += `You are currently advising on the plant: "${plantDetails.name}".
Database Details for "${plantDetails.name}":
- Care Level required: ${plantDetails.careLevel}
- Light Requirements: ${plantDetails.lightReq}
- Watering Specifications: ${plantDetails.waterReq || 'Not specified'}
- Pet Safe: ${plantDetails.petFriendly ? 'Yes (Pet friendly)' : 'No (Toxic to pets)'}
- General Description: ${plantDetails.description}

`;
    }

    if (location || lightLevel || wateringHabit) {
      systemPrompt += `User's Indoor Environment:
- Placement location: ${location || 'Indoor'}
- Natural light level in that spot: ${lightLevel || 'Indirect light'}
- User's watering habit: ${wateringHabit || 'Average watering'}

Tailor your care guidelines exactly to this environment. If the light level is insufficient or their watering habit conflicts with the plant's needs, explain this gently and offer concrete adjustments.

`;
    }

    systemPrompt += `Instructions for writing the guide:
1. Use clean markdown. Use bullet points, bold text, and clear headings.
2. Provide specific watering, sunlight, and general maintenance instructions (fertilizer, soil, leaf cleaning).
3. Include a "Warning Signs" section (e.g., what to do if leaves turn yellow, brown, or drop).
4. Be friendly, encouraging, and authoritative yet simple (explain things clearly like an ELI5 guide).
5. [!!! CRITICAL REQUIREMENT !!!] At the absolute end of your response, you MUST append the divider '---SUGGESTED_QUESTIONS---' on a new line, followed by exactly 3 suggested follow-up questions relevant to the current conversation that the user might want to click next.
Format them exactly like this:
---SUGGESTED_QUESTIONS---
1. [First question text]
2. [Second question text]
3. [Third question text]

DO NOT include suggested questions in the main body. Only at the very end after the divider.
`;

    // Ensure system prompt rules are enforced in HINGLISH/BANGLISH if user starts in those languages
    systemPrompt += `\n\n[!!! CRITICAL LANGUAGE OVERRIDE !!!]\nAuto-detect the user's language. If the user speaks Hindi, write the response in HINGLISH (Hindi written using English alphabet). If Bengali, write in BANGLISH. DO NOT use Devanagari or Bengali scripts. Otherwise, respond in clear, beautiful English.`;

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: systemPrompt,
      messages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Care API Error:", error?.message || error);
    return new Response(JSON.stringify({ error: error?.message || "Failed to process care request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
