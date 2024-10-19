const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Nastavení CORS - Aplikujeme jako první
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['https://jakub-jelinek.netlify.app'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));

// Přidání explicitního zpracování OPTIONS požadavků
app.options('*', cors());

// Nastavení pro zpracování JSON
app.use(express.json());

// Konfigurace Rate Limiteru - Aplikujeme až po CORS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 100, // maximálně 100 požadavků za 15 minut
    message: 'Překročen limit požadavků, zkuste to znovu později.'
});

// Použití Rate Limiteru na endpoint /chat
app.use('/chat', limiter);

// Funkce pro prodlevu
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const apiKey = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        console.log('Před voláním OpenAI API');
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

        console.log('Odpověď z OpenAI API:', response.data);
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Chyba při volání API:', error.message);
        if (error.response) {
            console.error('Stavový kód odpovědi:', error.response.status);
            console.error('Tělo odpovědi:', error.response.data);
        }
        res.status(500).send('Chyba při volání OpenAI');
    }
});

app.get('/test', (req, res) => {
    res.send('Server is up and running.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
