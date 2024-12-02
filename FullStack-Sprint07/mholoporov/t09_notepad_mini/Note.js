const moment = require('moment');

class Note {
    constructor(name, importance, text) {
        this.id = Date.now();
        this.name = name;
        this.importance = importance;
        this.text = text;
        this.date = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

module.exports = Note;