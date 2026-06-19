const { generateText } = require('ai');
const { createGroq } = require('@ai-sdk/groq');
const fs = require('fs');

async function test() {
  const env = fs.readFileSync('.env', 'utf8');
  const match = env.match(/GROQ_API_KEY=\"?([^\"]+)\"?/);
  const groq = createGroq({ apiKey: match[1] });
  
  // create a valid base64 1x1 png image
  const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const dataUrl = `data:image/png;base64,${base64Image}`;

  try {
    const { text } = await generateText({
      model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'What is this image?' },
            { type: 'image', image: dataUrl }
          ]
        }
      ]
    });
    console.log("SUCCESS:", text);
  } catch (err) {
    console.log("ERROR:", err.message || err);
  }
}

test();
