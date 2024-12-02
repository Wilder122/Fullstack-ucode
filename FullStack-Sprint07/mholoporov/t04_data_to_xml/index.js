const express = require('express');
const path = require('path');
const fs = require('fs');
const AvengerQuote = require('./AvengerQuote');
const ListAvengerQuotes = require('./ListAvengerQuotes');

const app = express();
const port = 3000;

const avengerQuotes = new ListAvengerQuotes();

avengerQuotes.addQuote(new AvengerQuote(
    1,
    'Tony Stark',
    'I am Iron Man.',
    ['https://the-flow.ru/uploads/images/resize/830x0/adaptiveResize/13/80/83/38/87/b770e8440cd7.jpg'],
    '2024-05-03',
    { '2024-05-04': 'Awesome quote!', '2024-05-05': 'Legendary!' }
));

avengerQuotes.addQuote(new AvengerQuote(
    2,
    'Steve Rogers',
    'I can do this all day.',
    ['https://upload.wikimedia.org/wikipedia/ru/6/6b/Chris_Evans_as_Steve_Rogers_Captain_America.jpg'],
    '2024-05-04',
    { '2024-05-06': 'Inspiring!' }
));

avengerQuotes.addQuote(new AvengerQuote(
    3,
    'Thor',
    'Bring me Thanos!',
    ['https://upload.wikimedia.org/wikipedia/ru/3/3c/Chris_Hemsworth_as_Thor.jpg'],
    '2024-05-05',
    { '2024-05-07': 'Epic!' }
));

avengerQuotes.addQuote(new AvengerQuote(
    4,
    'Natasha Romanoff',
    'I get emails from a raccoon, so nothing sounds crazy anymore.',
    ['https://thecity.m24.ru/b/c/39542.jpg'],
    '2024-05-06',
    { '2024-05-08': 'Funny!' }
));

app.use(express.static(path.join(__dirname)));

app.get('/original-quotes', (req, res) => {
    res.json(avengerQuotes.quotes);
});

app.get('/xml-quotes', (req, res) => {
    avengerQuotes.toXML('avenger_quote.xml');
    const newAvengerQuotes = new ListAvengerQuotes();
    newAvengerQuotes.fromXML('avenger_quote.xml');
    res.json(newAvengerQuotes.quotes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. - Install 'npm install express xml2js'
// 2. - Run 'node index.js'