import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

    // Convert UI messages to clean CoreMessage objects for Vercel AI SDK streamText
    const coreMessages: any[] = [];
    if (Array.isArray(messages)) {
      for (const msg of messages) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          let textContent = '';
          if (msg.content) {
            textContent = msg.content;
          } else if (msg.parts && Array.isArray(msg.parts)) {
            textContent = msg.parts
              .filter((p: any) => p.type === 'text')
              .map((p: any) => p.text || '')
              .join(' ');
          }
          if (!textContent) continue;
          coreMessages.push({
            role: msg.role,
            content: textContent
          });
        }
      }
    }

    const systemPrompt = `You are a friendly, polite, and expert botanist AI. 
The user recently scanned a plant with the following diagnosis context:
Plant Name: ${context?.plantName || "Unknown"}
Diagnosis Context: ${context?.diagnosis || "No diagnosis provided."}

Your job is to answer their follow-up questions in a natural, polite, and conversational way.
Keep your language simple and easy to understand. Speak strictly about plant care and this specific diagnosis.
Do not use complicated scientific jargon without explaining it simply.
Be very helpful and supportive!`;

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
