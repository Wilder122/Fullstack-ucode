const express = require('express');
const bodyParser = require('body-parser');
const iconv = require('iconv-lite');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/convert', bodyParser.json(), (req, res) => {
    const { inputString, charsets } = req.body;
    let results = {};

    charsets.forEach(charset => {
        const buffer = Buffer.from(inputString, 'utf-8');
        results[charset] = iconv.decode(buffer, charset);
    });

    res.json(results);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. Install 'npm install express iconv-lite'
// 2. Run 'node server.js'