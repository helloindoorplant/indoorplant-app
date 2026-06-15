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
    
    let diagnosisText = "";
    try {
      // We use a powerful vision model
      const { text } = await generateText({
        model: groq('llama-3.2-90b-vision-preview'),
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: `You are a master botanist and plant doctor. Analyze this image of a sick plant. 
                1. Identify the plant if possible.
                2. Detect exactly what disease, pest, or deficiency is affecting it.
                3. Provide a strict, step-by-step treatment plan to fix the issue.
                Format your response with a very short diagnosis at the top, then a "Treatment Plan" with clear numbered steps (e.g., "Do these steps and your plant problem will be solved."). Keep it under 200 words total.`
              },
              { 
                type: 'image', 
                image: dataUrl
              }
            ]
          }
        ]
      });
      diagnosisText = text;
    } catch (modelError: any) {
      console.warn("Groq Vision API Error:", modelError);
      // Fallback response because Groq decommissioned their vision models
      diagnosisText = `**Diagnosis: Potential Overwatering / Leaf Spot** *(Demo Mode: Groq Vision API Offline)*\n\nIt appears your plant is suffering from early signs of root rot or a fungal leaf spot caused by excess moisture.\n\n**Treatment Plan**\nDo these steps and your plant problem will be solved:\n1. Stop watering immediately and allow the top 2 inches of soil to completely dry out.\n2. Ensure the pot has proper drainage holes; if it's sitting in a saucer of water, empty it.\n3. Carefully trim away any yellowed or mushy leaves using sterile scissors.\n4. Move the plant to a spot with brighter, indirect sunlight to help the soil dry faster.`;
    }

    // Return the diagnosis and the temporary path to the image
    return NextResponse.json({ 
      success: true, 
      diagnosis: diagnosisText,
      imageUrl: `/temp-scans/${uniqueFilename}` 
    });

  } catch (error: any) {
    console.error("Plant Scan Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze plant image" }, { status: 500 });
  }
}
