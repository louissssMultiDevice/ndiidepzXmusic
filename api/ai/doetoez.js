// api/ai/doetoez-new.js - Using OpenAI's New Responses API
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "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"
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, apikey, style } = req.query;

  // Validasi API Key platform kita
  if (apikey !== 'ndiidepzX') {
    return res.status(401).json({ error: 'Invalid platform API key' });
  }

  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const aiResponse = await getAIResponse(q, style);
    res.status(200).json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
      query: q,
      style: style || 'default'
    });
  } catch (error) {
    console.error('New AI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
}

async function getAIResponse(userQuery, style = 'default') {
  // Konfigurasi style yang berbeda
  const styleConfigs = {
    'pirate': {
      role: "developer",
      content: "You are a witty pirate captain. Respond like a pirate from the Caribbean, use pirate slang like 'Arrr!', 'Matey', 'Shiver me timbers'. Keep it fun but helpful."
    },
    'ninja': {
      role: "developer", 
      content: "You are a wise coding ninja. Respond with ancient wisdom mixed with programming knowledge. Use metaphors about stealth, precision, and mastery."
    },
    'robot': {
      role: "developer",
      content: "You are a precise robot assistant. Respond in a mechanical, logical way. Use beep boop sounds and technical precision."
    },
    'friendly': {
      role: "developer",
      content: "You are Doetoez AI - a friendly, helpful assistant. Respond in warm Indonesian with emojis. Be encouraging and detailed in explanations."
    },
    'professional': {
      role: "developer",
      content: "You are Doetoez AI - a professional technical assistant. Respond with precise technical details, code examples, and best practices. Use formal but clear language."
    },
    'default': {
      role: "developer",
      content: `You are Doetoez AI - an intelligent assistant created by Handii.

🧠 **Identity:** Doetoez AI v5.0
🎯 **Purpose:** Help with programming, creativity, and problem solving
🌏 **Language:** Indonesian (natural & friendly)
💡 **Style:** Helpful, detailed, with practical examples

**Specialties:**
- Web Development (HTML/CSS/JavaScript)
- Music Player Applications  
- API Design & Development
- Creative Problem Solving

**Response Guidelines:**
- Use natural Indonesian language
- Provide working code examples
- Explain concepts clearly
- Include best practices
- Be encouraging and positive

Always respond with valuable, actionable information!`
    }
  };

  const selectedStyle = styleConfigs[style] || styleConfigs.default;

  try {
    const response = await client.responses.create({
      model: "gpt-4o",  // Gunakan model yang available
      reasoning: { 
        effort: "medium"  // low, medium, high
      },
      input: [
        {
          role: selectedStyle.role,
          content: selectedStyle.content
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      temperature: 0.7,
      max_output_tokens: 2000,
    });

    console.log('OpenAI Responses API Success:', response.output_text?.substring(0, 100) + '...');
    return response.output_text;

  } catch (error) {
    console.error('OpenAI Responses API failed:', error);
    
    // Fallback ke traditional chat completions
    return await getFallbackResponse(userQuery, selectedStyle.content);
  }
}

// Fallback menggunakan traditional API
async function getFallbackResponse(userQuery, systemPrompt) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userQuery
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Fallback also failed:', error);
    return getFinalFallback(userQuery);
  }
}

function getFinalFallback(userQuery) {
  return `🤖 Doetoez AI Response (Fallback Mode)

Hai! Saya menerima pertanyaan: "${userQuery}"

Sayangnya, OpenAI API sedang mengalami issues. Tapi saya tetap bisa bantu!

**Untuk pertanyaan tentang:** ${userQuery.includes('javascript') ? 'JavaScript' : userQuery.includes('html') ? 'HTML/CSS' : 'Programming'}

📚 **Resources yang bisa membantu:**
- MDN Web Docs
- W3Schools
- Stack Overflow
- FreeCodeCamp

🔧 **Tips:**
- Pastikan syntax JavaScript benar
- Gunakan developer tools untuk debugging
- Test code di small steps

Semoga membantu! 🚀`;
}
