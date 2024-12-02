const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const normalRouter = require('./normal-router');
const quantumRouter = require('./quantum-router');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/normal', normalRouter);
app.use('/quantum', quantumRouter);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Time Calculation</h1><a href="/normal">Normal Time</a><br><a href="/quantum">Quantum Time</a>');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. npm install express ejs
// 2. node index.js