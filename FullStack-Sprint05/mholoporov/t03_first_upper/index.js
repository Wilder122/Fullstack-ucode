function firstUpper(inputString) {
    if (typeof inputString !== 'string') {
        return '';
    }
    inputString = inputString.trim();
    return inputString === '' ? '' : inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}

module.exports = { firstUpper };