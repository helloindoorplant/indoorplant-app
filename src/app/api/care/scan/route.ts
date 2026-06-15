import { NextResponse } from 'next/server';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // We don't save the image to disk anymore. It's processed entirely in memory!
    // This perfectly satisfies the "delete instantly" rule and bypasses Vercel's read-only filesystem.

    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
    
    let diagnosisData = {
      isPlant: true,
      plantName: "Unknown Plant",
      diagnosis: "",
      suggestedQuestions: [] as string[]
    };

    try {
      const { text } = await generateText({
        model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: `You are a master botanist and plant doctor. Analyze this image carefully.
                1. Check if the image actually contains a plant. If it does NOT contain a plant, set "isPlant" to false.
                2. Identify the plant variety as accurately as possible (aim for 100% accurate plant name detection).
                3. Evaluate the plant's health. 
                   - If the plant condition is GOOD/HEALTHY, set the "diagnosis" to exactly this string: "Your plant is fine, you don't need to do anything special. Just continue with normal care and maintenance."
                   - If the plant is DAMAGED, UNHEALTHY, or FACING PROBLEMS, provide a short diagnosis and a step-by-step treatment plan to fix the issue.
                4. Provide 3 suggested follow-up questions the user can ask you in a chat.
                
                Respond ONLY with a JSON object in this exact format, with no markdown formatting around it:
                {
                  "isPlant": true,
                  "plantName": "String",
                  "diagnosis": "String (The diagnosis and treatment plan, or the healthy message)",
                  "suggestedQuestions": ["Question 1", "Question 2", "Question 3"]
                }
                
                [CRITICAL RULE]: NEVER use the words "Grok", "Groq", "Llama", or any other model name in your responses. If asked who you are, refer to yourself only as the "IndoorPlant AI Botanist".`
              },
              { 
                type: 'image', 
                image: dataUrl
              }
            ]
          }
        ]
      });
      
      const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      diagnosisData = JSON.parse(jsonText);
      
    } catch (modelError: any) {
      console.error("Groq Vision API Error:", modelError);
      return NextResponse.json({ 
        success: false, 
        error: "Failed to analyze the image. Please try again." 
      }, { status: 500 });
    }

    if (!diagnosisData.isPlant) {
      // Instead of throwing an error, we return success: true but isPlant: false.
      // This allows the frontend to show a friendly retake option instead of a red error.
      return NextResponse.json({ 
        success: true, 
        isPlant: false,
        error: "Only plant images can be uploaded here. Other types of images are not accepted." 
      });
    }

    // Return the diagnosis. We no longer return an imageUrl because the frontend uses a local blob URL.
    return NextResponse.json({ 
      success: true, 
      isPlant: diagnosisData.isPlant,
      plantName: diagnosisData.plantName,
      diagnosis: diagnosisData.diagnosis,
      suggestedQuestions: diagnosisData.suggestedQuestions
    });

  } catch (error: any) {
    console.error("Plant Scan Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze plant image" }, { status: 500 });
  }
}
