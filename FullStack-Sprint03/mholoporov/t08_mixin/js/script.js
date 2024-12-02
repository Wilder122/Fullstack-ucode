const houseMixin = {
    wordReplace(oldWord, newWord) {
        this.description = this.description.replace(oldWord, newWord);
    },
    wordInsertAfter(targetWord, insertWord) {
        const words = this.description.split(' ');
        const targetIndex = words.findIndex(word => word === targetWord);
        if (targetIndex !== -1) {
            words.splice(targetIndex + 1, 0, insertWord);
            this.description = words.join(' ');
        }
    },
    wordDelete(targetWord) {
        this.description = this.description.replace(new RegExp(targetWord, 'g'), '');
    },
    wordEncrypt() {
        this.description = this.description.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    },
    wordDecrypt() {
        this.wordEncrypt();
    }
};