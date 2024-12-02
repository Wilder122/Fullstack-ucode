const fs = require('fs');
const path = require('path');

class FileList {
    constructor() {
        this.dirPath = path.join(__dirname, 'tmp');
    }

    getList() {
        if (!fs.existsSync(this.dirPath)) {
            return [];
        }
        return fs.readdirSync(this.dirPath);
    }

    hasFiles() {
        return this.getList().length > 0;
    }

    getHTMLList() {
        const files = this.getList();
        return `<ul>${files.map(file => `<li><a href="/select-file?file=${file}">${file}</a></li>`).join('')}</ul>`;
    }
}

module.exports = FileList;