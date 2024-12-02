const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/fetch-html', async (req, res) => {
    const { url } = req.body;
    try {
        if (!url) {
            res.status(400).json({ error: 'URL is required' });
            return;
        }

        const response = await axios.get(url);
        const bodyContentMatch = response.data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

        if (!bodyContentMatch) {
            res.status(400).json({ error: 'No body tag found in the provided URL' });
            return;
        }

        const bodyContent = bodyContentMatch[1];
        res.json({ bodyContent });
    } catch (error) {
        console.error('Error fetching URL:', error.message);
        res.status(500).json({ error: 'Error fetching URL' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




// 1. - Install 'npm install'
// 2. - Run 'node index.js'