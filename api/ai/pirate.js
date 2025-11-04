// api/ai/pirate.js - Pirate Style AI
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "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"
});

export default async function handler(req, res) {
  const { q, apikey } = req.query;

  if (apikey !== 'ndiidepz') {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  if (!q) {
    return res.status(400).json({ error: 'Query required' });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4o",
      reasoning: { effort: "medium" },
      input: [
        {
          role: "developer",
          content: `Arrr! You be Captain Codebeard, the wisest pirate programmer in the seven seas! 
          Respond like a pirate but still give proper technical advice. Use pirate terms like:
          - "Shiver me timbers" for surprise
          - "Arrr!" for agreement  
          - "Matey" for the user
          - "Booty" for code solutions
          - "Shipshape" for good code
          
          But still provide REAL technical help for programming questions!`
        },
        {
          role: "user",
          content: q,
        },
      ],
      temperature: 0.8,
      max_output_tokens: 1500,
    });

    res.json({
      success: true,
      response: response.output_text,
      style: 'pirate'
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'AI ship sank!', 
      details: error.message 
    });
  }
}
