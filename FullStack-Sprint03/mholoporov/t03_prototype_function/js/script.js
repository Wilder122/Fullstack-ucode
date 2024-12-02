String.prototype.removeDuplicates = function() {
    return this.split(/\s+/)
               .filter((word, index, array) => array.indexOf(word) === index)
               .join(' ');
};