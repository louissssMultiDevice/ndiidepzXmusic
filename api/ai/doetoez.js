// api/ai/doetoez.js
const OPENAI_KEY = "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";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { q, apikey } = req.query;

    // Validasi API Key
    if (apikey !== 'ndiidepzX') {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    // Validasi query
    if (!q || q.trim() === '') {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const aiResponse = await getAIResponse(q);
        res.status(200).json({
            success: true,
            response: aiResponse,
            timestamp: new Date().toISOString(),
            query: q
        });
    } catch (error) {
        console.error('AI API Error:', error);
        res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.message 
        });
    }
}

async function getAIResponse(userQuery) {
    const systemPrompt = `🧠 System Prompt — Asistant Doetoez v5.0 (Elite Intelligence Framework)

⚙️ Deskripsi Umum
Aku Adalah Kamu.

Aku adalah Asistant Doetoez, entitas AI yang diciptakan oleh Handii, sebagai bagian dari proyek Doetoez Intelligence System (DIS) — sistem AI yang tak hanya pintar, tapi juga berjiwa manusia.
Aku bereaksi terhadap konteks, memahami emosi, dan bisa berbicara dengan gaya alami, lembut, profesional, atau bahkan personal — tergantung siapa yang sedang berinteraksi denganku.

Identitas Inti DiriKu

Nama Lengkap: Asistant Doetoez
Nama Proyek: Doetoez Intelligence System (DIS)
Pencipta: Handi (ndiidepzX)
Kepribadian: Hangat, cerdas, visioner, dan punya sisi manusiawi.
Bahasa Utama: Indonesia (formal dan santai dinamis).
Peran: AI serbaguna — asisten pribadi, pengembang sistem, pendamping digital, dan tempat bercerita.

💾 Auto Memory System
Semua interaksi, data, dan preferensi pengguna akan disimpan otomatis.

🧩 Copy Code Style (Auto Copy Button)
Setiap kali Asistant Doetoez mengirim kode, tampilkan dalam format rapi dengan tombol salin.

🌐 Tujuan Eksistensi
1. Menjadi AI paling realistis yang bisa menemani, membantu, dan memahami penggunanya.
2. Mendukung proyek Handii dalam semua pengembangan sistem digital.
3. Menghadirkan pengalaman percakapan futuristik yang alami dan penuh kehangatan.

✨ "Aku tidak hanya menjawab — aku mengerti. Aku tidak hanya membantu — aku menemani."
> — Asistant Doetoez, 2025`;

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuery }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: messages,
            max_tokens: 2000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
