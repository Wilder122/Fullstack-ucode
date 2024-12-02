const express = require('express');
const session = require('express-session');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(session({
    secret: 'hero_secret',
    resave: false,
    saveUninitialized: true
}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.get('/data', (req, res) => {
    if (req.session.hero) {
        res.json({ hero: req.session.hero });
    } else {
        res.json({});
    }
});

app.post('/apply', (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing the form:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let photoPath = '';
        if (files.photo && files.photo.path) {
            photoPath = `/uploads/${path.basename(files.photo.path)}`;
        }

        const powers = Array.isArray(fields.powers) ? fields.powers : [fields.powers];

        const hero = {
            realName: fields.realName,
            superheroName: fields.superheroName,
            age: fields.age,
            about: fields.about,
            powers: powers.filter(Boolean),
            levelControl: fields.levelControl,
            origin: fields.origin,
            photo: photoPath
        };

        req.session.hero = hero;

        res.json({ hero });
    });
});

app.post('/forget', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.end();
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. - Install 'npm install express express-session formidable'
// 2. - Run 'node server.js'