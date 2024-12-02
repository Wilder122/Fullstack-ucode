const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const port = 3000;

let sessionData = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/data', (req, res) => {
    if (sessionData.saved) {
        res.json({ saved: true, hash: sessionData.hash });
    } else {
        res.json({ saved: false });
    }
});

app.post('/save', (req, res) => {
    const password = req.body.password;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    sessionData.hash = hash;
    sessionData.salt = salt;
    sessionData.saved = true;

    res.redirect('/');
});

app.post('/check', (req, res) => {
    const password = req.body.password;
    const hash = sessionData.hash;
    const salt = sessionData.salt;
    const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    if (checkHash === hash) {
        sessionData = {};
        res.send(`
            <h1>Password</h1>
            <p style="color:green;">Hacked!</p>
            <p>Password not saved at session.<br>Password for saving to session</p>
            <form action="/save" method="POST">
            <input type="text" name="password" placeholder="Password to session">
                <button type="submit">Save</button>
            </form>
        `);
    } else {
        res.send(`
            <h1>Password</h1>
            <p style="color:red;">Access denied!</p>
            <p>Password saved at session.<br>Hash is ${hash}<br>Try to guess:</p>
            <form action="/check" method="POST">
                <input type="text" name="password" placeholder="Password to session">
                <button type="submit">Check password</button>
            </form>
            <form action="/clear" method="POST">
                <button type="submit">Clear</button>
            </form>
        `);
    }
});

app.post('/clear', (req, res) => {
    sessionData = {};
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// 1. Install 'npm install express'
// 2. Run 'node server.js'