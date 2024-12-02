const fs = require('fs-extra');
const Note = require('./Note');

class NotePad {
    constructor(fileName) {
        this.fileName = fileName;
        this.notes = this.loadNotes() || [];
    }

    loadNotes() {
        try {
            return fs.readJsonSync(this.fileName);
        } catch (error) {
            return [];
        }
    }

    saveNotes() {
        fs.writeJsonSync(this.fileName, this.notes);
    }

    getAllNotes() {
        return this.notes;
    }

    addNote(name, importance, text) {
        const newNote = new Note(name, importance, text);
        this.notes.push(newNote);
        this.saveNotes();
        return newNote;
    }

    getNoteById(id) {
        return this.notes.find(note => note.id == id);
    }

    deleteNoteById(id) {
        this.notes = this.notes.filter(note => note.id != id);
        this.saveNotes();
        return { success: true };
    }
}

module.exports = NotePad;