const express = require('express');
const bodyParser = require('body-parser');
const NotePad = require('./NotePad');

const app = express();
const notepad = new NotePad('notes.json');

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/add-note', (req, res) => {
    const { name, importance, text } = req.body;
    const newNote = notepad.addNote(name, importance, text);
    res.json(newNote);
});

app.get('/notes', (req, res) => {
    res.json(notepad.getAllNotes());
});

app.get('/note/:id', (req, res) => {
    const note = notepad.getNoteById(req.params.id);
    res.json(note);
});

app.delete('/note/:id', (req, res) => {
    const result = notepad.deleteNoteById(req.params.id);
    res.json(result);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




// 1. - Install 'npm install'
// 2. - Run 'node index.js'