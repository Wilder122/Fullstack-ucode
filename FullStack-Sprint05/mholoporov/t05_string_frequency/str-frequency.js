class StrFrequency {
    constructor(str) {
        this.str = str;
    }

    letterFrequencies() {
        const frequency = {};
        const cleanString = this.str.replace(/[^a-zA-Z]/g, '').toLowerCase();

        for (const char of cleanString) {
            if (frequency[char]) {
                frequency[char]++;
            } else {
                frequency[char] = 1;
            }
        }

        return frequency;
    }

        wordFrequencies() {
            const frequency = {};
            const words = this.str.toLowerCase().match(/\b[a-z]+\b/g) || [];
    
            if (words.length === 0) {
                frequency[""] = 1;
            } else {
                for (const word of words) {
                    if (frequency[word]) {
                        frequency[word]++;
                    } else {
                        frequency[word] = 1;
                    }
                }
            }
    
            return frequency;
        }

    reverseString() {
        return this.str.split('').reverse().join('');
    }
}

module.exports = StrFrequency;