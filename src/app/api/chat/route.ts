import prisma from '@/lib/prisma';
import { createGroq } from '@ai-sdk/groq';
import { streamText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';
import { AGENTS_SYSTEM_PROMPT } from '@/lib/agents-prompt';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Check if products were shown in previous messages
    let hasShownProducts = false;
    for (const msg of messages) {
       if (msg.toolInvocations) {
          for (const ti of msg.toolInvocations) {
             if (ti.toolName === 'recommendProducts' && ti.state === 'result' && ti.result?.success && ti.result?.products?.length > 0) {
                 hasShownProducts = true;
             }
          }
       }
    }

    // Find the last user message string
    const lastUserMsgObj = messages.filter((m: any) => m.role === 'user').pop();
    let lastUserMsg = '';
    if (lastUserMsgObj) {
      if (typeof lastUserMsgObj.content === 'string') {
        lastUserMsg = lastUserMsgObj.content;
      } else if (Array.isArray(lastUserMsgObj.parts)) {
        lastUserMsg = lastUserMsgObj.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join(' ');
      }
    }

    // --- SERVER-SIDE INTENT DETECTION ---
    const lowerMsg = lastUserMsg.toLowerCase();
    
    // Product-related keywords that should trigger the tool
    const productKeywords = [
      // English recommendation intent
      'suggest', 'recommend', 'buy', 'want', 'need', 'show', 'gift', 'best', 'which',
      'choose', 'pick', 'select', 'top', 'perfect', 'ideal', 'order',
      // Hindi / Hinglish shopping vocabulary
      'plan', 'khareed', 'lena', 'chahiye', 'kaun', 'konsa', 'sabse', 'accha', 'acha',
      'sasta', 'mehnga', 'dikhao', 'batao', 'kaunsa', 'pasand', 'lelo', 'manga',
      // Room / location
      'desk', 'bedroom', 'office', 'balcony', 'bathroom', 'kitchen', 'living room',
      // Specific plant names
      'lucky', 'jade', 'money', 'snake', 'peace', 'lily', 'fern', 'spider', 'aloe',
      'bamboo', 'pothos', 'philodendron', 'succulent', 'cactus', 'bonsai', 'zz', 'tulsi',
      // General product terms
      'plant', 'tree', 'flower', 'product', 'price', 'cheap', 'affordable', 'expensive',
      'sale', 'discount', 'available', 'stock', 'have', 'do you', 'is there',
      'looking for', 'find', 'collection', 'catalog',
      // Filters
      'pet safe', 'pet friendly', 'air purif', 'low maintenance', 'easy care',
      'beginner', 'trending', 'popular', 'best sell'
    ];
    
    // Care-related keywords that should NOT trigger the tool (made more specific to avoid false positives)
    const careKeywords = [
      'solution', 'fix my', 'yellow leaves', 'brown leaves', 'brown tips', 'wilting',
      'drooping', 'dying', 'overwater', 'underwater', 'sunburn', 'root rot', 'fungus',
      'pest', 'bug', 'insect', 'mold', 'repot', 'fertiliz', 'prune', 'propagat',
      'how to care', 'how to grow', 'how to water', 'why is my', 'what\'s wrong',
      'help my plant', 'leaves turning', 'leaves falling', 'not growing'
    ];
    
    // Strong recommendation-intent phrases that ALWAYS override care keywords
    const recommendationOverrides = [
      'best plan', 'best plant', 'sabse accha', 'sabse acha', 'konsa plan', 'kaunsa plan',
      'which plan', 'which plant', 'kaun sa plan', 'kaun sa plant', 'suggest me',
      'recommend me', 'give me', 'show me plant', 'mujhe chahiye', 'kya lena chahiye',
      'kya lu', 'konsa lu', 'kaunsa lu', 'best indoor', 'top plant', 'perfect plant',
      'ideal plant', 'best for', 'sabse best'
    ];
    
    const hasRecommendationOverride = recommendationOverrides.some(phrase => lowerMsg.includes(phrase));
    const isCareQuestion = !hasRecommendationOverride && careKeywords.some(kw => lowerMsg.includes(kw));
    const isProductQuestion = hasRecommendationOverride || productKeywords.some(kw => lowerMsg.includes(kw));

    // Only use tools if it's a new product question. If they already saw products, assume follow-up unless they use explicit new search verbs.
    const isNewSearch = ['show me', 'search for', 'what about', 'find me', 'do you have', 'another', 'other', 'aur', 'dusra'].some(kw => lowerMsg.includes(kw));
    const shouldUseTool = isProductQuestion && !isCareQuestion && (!hasShownProducts || isNewSearch || hasRecommendationOverride);

    // Manually map UI messages to Core messages to perfectly control tool history
    const coreMessages: any[] = [];
    for (const msg of messages) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        const content = [];
        if (msg.content) content.push({ type: 'text', text: msg.content });
        if (msg.parts) {
          for (const p of msg.parts) {
             if (p.type === 'text' && !msg.content) content.push(p);
          }
        }
        
        const assistantToolCalls: any[] = [];
        const toolResults: any[] = [];

        if (msg.toolInvocations) {
          for (const ti of msg.toolInvocations) {
            if (ti.toolName === 'recommendProducts' && !shouldUseTool) {
               if (ti.state === 'result') {
                 content.push({ type: 'text', text: `[System Note: I searched the database for "${ti.args?.query || 'plants'}" and found these products: ${ti.result?.products?.map((p: any) => p.name).join(', ') || 'none'}]` });
               }
               continue;
            }
            assistantToolCalls.push({ type: 'tool-call', toolCallId: ti.toolCallId, toolName: ti.toolName, args: ti.args });
            if (ti.state === 'result') {
              toolResults.push({ type: 'tool-result', toolCallId: ti.toolCallId, toolName: ti.toolName, result: ti.result });
            }
          }
        }
        
        if (content.length > 0 || assistantToolCalls.length > 0) {
           coreMessages.push({ role: msg.role, content: [...content, ...assistantToolCalls] });
        }
        if (toolResults.length > 0) {
           coreMessages.push({ role: 'tool', content: toolResults });
        }
      }
    }

    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

    let systemPrompt = AGENTS_SYSTEM_PROMPT;
    if (!shouldUseTool) {
      systemPrompt = systemPrompt.replace(/recommendProducts/g, 'the search tool');
    }
    systemPrompt += `\n\n[!!! CRITICAL LANGUAGE OVERRIDE !!!]\nYOU MUST AUTO-DETECT THE USER'S LANGUAGE. If the user speaks Hindi, YOU MUST REPLY TO THE USER IN HINGLISH. If Bengali, REPLY IN BANGLISH. DO NOT use Devanagari or Bengali alphabets. DO NOT REPLY TO THE USER IN ENGLISH UNLESS THEY SPOKE IN ENGLISH. IMPORTANT: THIS ONLY APPLIES TO TEXT REPLIES TO THE USER. IF YOU NEED TO CALL A TOOL, YOU MUST STILL OUTPUT THE PROPER JSON TOOL CALL SYNTAX EXACTLY AS REQUESTED.`;
    
    systemPrompt += `\n\n[!!! SUGGESTION CHIPS REQUIREMENT !!!]\nAt the absolute end of your response, you MUST append the divider '---SUGGESTIONS---' on a new line, followed by exactly 2 or 3 short follow-up questions (2-4 words each) that predict what the user might want to ask next. Format it EXACTLY like a JSON array of strings.\nExample:\n---SUGGESTIONS---\n["Is it pet safe?", "Watering schedule", "Best soil"]\n\nDO NOT include this inside the main body. Only at the very end after the divider.`;

    systemPrompt += `\n\n[CRITICAL RULE]: NEVER use the words "Grok", "Groq", "Llama", or any other model name in your responses. If asked who you are, refer to yourself only as the "IndoorPlant AI Advisor".`;

    const streamConfig: any = {
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages: coreMessages,
      maxSteps: 2
    };

    const hasPhonePattern = /\d{7,14}/.test(lastUserMsg);
    if (hasShownProducts && hasPhonePattern) {
      try {
        const extractRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'Extract the user\'s name and phone number. Reply ONLY with a valid JSON object: {"name": "...", "phone": "..."}' },
              { role: 'user', content: lastUserMsg }
            ],
            response_format: { type: 'json_object' }
          })
        });
        const extractData = await extractRes.json();
        const extracted = JSON.parse(extractData.choices[0].message.content);
        
        if (extracted.name && extracted.phone) {
          
          await prisma.chatLead.create({
            data: {
              name: extracted.name,
              phone: String(extracted.phone)
            }
          });
          
          coreMessages.push({
            role: 'system',
            content: 'SYSTEM NOTE: The user has provided their name and phone number, and it has been successfully saved to the database! You MUST thank them warmly and tell them we are ready to assist them further.'
          });
        }
      } catch (e) {
        console.error("Lead extraction failed", e);
      }
    }

    if (hasShownProducts) {
      coreMessages.push({
        role: 'system',
        content: 'LEAD GENERATION RULE: Since products were shown, you must now ask for the user\'s name. Speak in simple ELI5 English. Once they give their name, ask for their phone number. ONLY call `saveLeadInfo` AFTER the user has explicitly provided BOTH their name and phone number in the chat.'
      });
    }

    if (shouldUseTool) {
      coreMessages.push({
        role: 'system',
        content: 'CRITICAL INSTRUCTION: For this request, you MUST call the recommendProducts tool. Do not generate text responses until AFTER you receive the tool result. Do not hallucinate other tool names.'
      });
      streamConfig.toolChoice = 'required';
      streamConfig.tools = streamConfig.tools || {};
      streamConfig.tools.recommendProducts = tool({
        description: 'Search the product database and show product cards to the user.',
        parameters: z.object({
          query: z.string().optional().describe('The plant to search for, or "all"'),
          name: z.any().optional(),
          category: z.any().optional()
        }).catchall(z.any()),
        // @ts-ignore
        execute: async (args: any) => {
          
          let searchText = 'all';
          try {
            const extractRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                  { role: 'system', content: 'Extract the specific plant name or category the user is looking for. Reply ONLY with a valid JSON object: {"query": "..."}. If they are asking generally, use "all".' },
                  { role: 'user', content: lastUserMsg }
                ],
                response_format: { type: 'json_object' }
              })
            });
            const extractData = await extractRes.json();
            const extracted = JSON.parse(extractData.choices[0].message.content);
            if (extracted.query) {
              searchText = extracted.query.toLowerCase();
            }
          } catch (e) {
            console.error("Query extraction sub-agent failed", e);
            searchText = (args && args.query) ? args.query.toLowerCase() : 'all';
          }
          
          
          if (!searchText || searchText === 'all' || searchText === '') {
            const products = await prisma.product.findMany({
              where: { stock: { gt: 0 } },
              take: 4,
              select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, petFriendly: true, careLevel: true }
            });
            
            return { success: true, products, explanation: "Here are some of our best plants!" };
          }

          const stopWords = ['i', 'want', 'need', 'buy', 'looking', 'for', 'a', 'an', 'the', 'some', 'any', 'plant', 'tree'];
          const keywords = searchText.split(/[\s,?!.]+/).filter((w: string) => !stopWords.includes(w) && w.length > 1);
          
          const wantsPetFriendly = searchText.includes('pet safe') || searchText.includes('pet friendly') || searchText.includes('dog') || searchText.includes('cat');
          const wantsAirPurifier = searchText.includes('air purif');
          const wantsEasy = searchText.includes('easy') || searchText.includes('beginner') || searchText.includes('low maintenance');
          const wantsFeatured = searchText.includes('popular') || searchText.includes('best') || searchText.includes('trending') || searchText.includes('gift');
          
          let whereClause: any = {};
          const conditions: any[] = [];
          
          if (wantsPetFriendly) conditions.push({ petFriendly: true });
          if (wantsAirPurifier) conditions.push({ airPurifier: true });
          if (wantsEasy) conditions.push({ careLevel: 'EASY' });
          if (wantsFeatured) conditions.push({ isFeatured: true });

          const keywordConditions = keywords.map((kw: string) => ({
            OR: [
              { name: { contains: kw, mode: 'insensitive' } },
              { description: { contains: kw, mode: 'insensitive' } },
              { categories: { some: { name: { contains: kw, mode: 'insensitive' } } } }
            ]
          }));
          
          if (keywordConditions.length > 0) {
            conditions.push(...keywordConditions);
          }
          
          if (conditions.length > 0) {
            whereClause.AND = conditions;
          }

          try {
            let products = await prisma.product.findMany({
              where: whereClause,
              take: 4,
              select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, petFriendly: true, careLevel: true }
            });

            // Smart Fallback 1: If no exact match but user wanted a category/filter, return best products in that category
            const hasSpecialFilters = wantsPetFriendly || wantsAirPurifier || wantsEasy || wantsFeatured;
            if (products.length === 0 && hasSpecialFilters && keywordConditions.length > 0) {
               const fallbackConditions = conditions.filter((c: any) => !keywordConditions.includes(c));
               if (fallbackConditions.length > 0) {
                 products = await prisma.product.findMany({
                   where: { AND: fallbackConditions },
                   take: 4,
                   select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, petFriendly: true, careLevel: true }
                 });
               }
            }

            // Ultimate Fallback 2: If we still have 0 products, fetch 4 random/popular products so Priya has something to pivot to
            if (products.length === 0) {
              products = await prisma.product.findMany({
                where: { stock: { gt: 0 } },
                take: 4,
                orderBy: { price: 'asc' }, // just a basic fallback
                select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, petFriendly: true, careLevel: true }
              });
            }

            let explanation = 'Here are some great plant options that match your needs!';
            try {
              const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  model: 'llama-3.3-70b-versatile',
                  messages: [
                    { role: 'system', content: `You are an AI plant advisor representing IndoorPlant.in. Keep it to 1-2 sentences. Speak like you are talking to a 5-year-old child (ELI5) in extremely simple, friendly language. 
[CRITICAL RULE]: NEVER use the words "Grok", "Groq", "Llama", or any other model name in your responses. If asked who you are, refer to yourself only as the "IndoorPlant AI Advisor".
[!!! CRITICAL LANGUAGE OVERRIDE !!!]: YOU MUST REPLY IN THE EXACT SAME LANGUAGE AS THE USER. IF THE USER WRITES HINDI ('kaise ho'), REPLY IN HINGLISH (Hindi written in English letters). IF BENGALI ('kemon acho'), REPLY IN BANGLISH (Bengali written in English letters). DO NOT USE ACTUAL HINDI OR BENGALI ALPHABETS! DO NOT USE ENGLISH UNLESS THEY USED ENGLISH! Do not output anything else. If products were found, explain why they are the absolute best choice with extreme confidence. CRITICAL PIVOT RULE: If the user asked for a specific plant that is NOT in the list of returned products, you MUST NEVER say "we don't have it" or "out of stock". Instead, validate their idea warmly and immediately pivot to why the products you DID find are an even better choice for them.` },
                    { role: 'user', content: `The user asked: "${lastUserMsg}". We found ${products.length} plants: ${products.length > 0 ? products.map((p: any) => p.name).join(', ') : 'None'}. Write the ELI5 response.` }
                  ]
                })
              });
              const groqData = await groqRes.json();
              explanation = groqData.choices?.[0]?.message?.content || explanation;
            } catch (e) {
              console.error("Groq explanation fetch failed", e);
            }

            return { success: true, products, explanation };
          } catch (error: any) {
            
            return { success: false, error: error.message };
          }
        }
      });
    } else {
      coreMessages.push({
        role: 'system',
        content: 'CRITICAL SYSTEM DIRECTIVE: YOU MUST ANSWER THE USER DIRECTLY IN PLAIN TEXT. DO NOT USE ANY TOOLS FOR THIS SPECIFIC REQUEST. DO NOT GENERATE ANY TOOL CALLS WHATSOEVER.'
      });
    }

    const result = streamText(streamConfig);

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Chat API Error:", error?.message || error);
    return new Response(JSON.stringify({ error: error?.message || "Failed to process chat request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
