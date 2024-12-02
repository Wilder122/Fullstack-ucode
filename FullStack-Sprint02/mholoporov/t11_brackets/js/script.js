function checkBrackets(str) {
    // Check if the input is a string and contains brackets
    if (typeof str !== 'string' || !/\(|\)/.test(str)) return -1;

    let count = 0;
    let openCount = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            openCount++;
        } else if (str[i] === ')') {
            if (openCount === 0) {
                count++;
            } else {
                openCount--;
            }
        }
    }
    // Return the total number of brackets required
    return count + openCount;
}
