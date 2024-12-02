function checkDivision(start = 1, end = 60) {
    for (let i = start; i <= end; i++) {
        let results = [];
        if (i % 2 === 0) results.push('is divisible by 2');
        if (i % 3 === 0) results.push('is divisible by 3');
        if (i % 10 === 0) results.push('is divisible by 10');

        console.log(`The number ${i} ${results.length ? results.join(', ') : '-'}`);
    }
}

module.exports = { checkDivision };