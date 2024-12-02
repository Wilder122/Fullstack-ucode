const express = require('express');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const port = 3000;

const MARVEL_API_URL = 'https://gateway.marvel.com:443/v1/public/characters';
const MARVEL_PUBLIC_KEY = '5dab8efa1093bc52f3c4a599af6eb417';
const MARVEL_PRIVATE_KEY = 'f5560a3132b7dbb36e7ca2a11378176eb9aa8e1d';

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/api/characters', async (req, res) => {
    try {
        const ts = new Date().getTime();
        const hash = crypto.createHash('md5').update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY).digest('hex');
        const response = await axios.get(`${MARVEL_API_URL}?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Marvel API data:', error.message);
        res.status(500).send('Error fetching Marvel API data');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. - Install 'npm install'
// 2. - Run 'node index.js'