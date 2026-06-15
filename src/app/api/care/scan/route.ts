import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

// Clean up files older than 2 hours (120 minutes)
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

function cleanupOldFiles(directory: string) {
  try {
    if (!fs.existsSync(directory)) return;
    
    const files = fs.readdirSync(directory);
    const now = Date.now();

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge > MAX_AGE_MS) {
        fs.unlinkSync(filePath);
        console.log(`[Auto-Cleanup] Deleted old scan: ${file}`);
      }
    }
  } catch (error) {
    console.error("Cleanup error:", error);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    // 1. Ensure temp directory exists and clean up old files
    const uploadDir = path.join(process.cwd(), 'public', 'temp-scans');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Automatically delete files older than 2 hours immediately
    cleanupOldFiles(uploadDir);

    // 2. Save the new image
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    
    fs.writeFileSync(filePath, buffer);

    // 3. Send to AI (Groq Vision)
    // Format the image for AI consumption (base64)
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
      // We use Groq's new Llama 4 Scout Vision model
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
                }`
              },
              { 
                type: 'image', 
                image: dataUrl
              }
            ]
          }
        ]
      });
      
      // Parse the JSON (assuming the model follows instructions)
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
      // Delete the image instantly if it's not a plant
      try {
        fs.unlinkSync(filePath);
      } catch (e) {}
      
      return NextResponse.json({ 
        success: false, 
        error: "Only plant-related images can be uploaded here." 
      }, { status: 400 });
    }

    // Return the diagnosis and the temporary path to the image
    return NextResponse.json({ 
      success: true, 
      isPlant: diagnosisData.isPlant,
      plantName: diagnosisData.plantName,
      diagnosis: diagnosisData.diagnosis,
      suggestedQuestions: diagnosisData.suggestedQuestions,
      imageUrl: `/temp-scans/${uniqueFilename}` 
    });

  } catch (error: any) {
    console.error("Plant Scan Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze plant image" }, { status: 500 });
  }
}
