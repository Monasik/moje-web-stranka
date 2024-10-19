const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'https://jakub-jelinek.netlify.app'  // Doména frontendu
}));
 // Povolit CORS pro všechny požadavky

// Funkce pro prodlevu
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const apiKey = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Přidání prodlevy 1 sekundu (1000 ms)
        await delay(1000);

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Chyba při volání API:', error);
        res.status(500).send('Chyba při volání OpenAI');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
