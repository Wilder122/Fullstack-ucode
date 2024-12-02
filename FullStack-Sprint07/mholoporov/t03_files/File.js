const fs = require('fs');
const path = require('path');

class File {
    constructor(fileName) {
        this.filePath = path.join(__dirname, 'tmp', fileName);
    }

    write(content) {
        if (!fs.existsSync(path.dirname(this.filePath))) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
        }
        fs.appendFileSync(this.filePath, content);
    }

    read() {
        return fs.readFileSync(this.filePath, 'utf8');
    }

    delete() {
        fs.unlinkSync(this.filePath);
    }

    exists() {
        return fs.existsSync(this.filePath);
    }
}

module.exports = File;