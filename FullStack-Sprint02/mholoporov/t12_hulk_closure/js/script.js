let count = 0;

function concat(string1, string2) {

    function func1() {
        func1.count= 0;
        let secondString = prompt('Enter second string!');
        if (secondString.length < 1) {
            return string1;
        }
        return string1 + ' ' + secondString;
    };

    if (string2 === undefined) {
        let result = func1();
        count;
        return { result: result, count: count++ };
    } else {
        let result = string1 + ' ' + string2;
        count;
        return { result: result, count: count++ };
    }
}

// Test cases
let phrase1 = concat("Hulk", "smash!");
console.log(phrase1.result);

let phrase2 = concat("Leave", "Hulk alone!");
console.log(phrase2.result);
console.log(phrase2.count);

let phrase3 = concat("Leave me alone, please!");
console.log(phrase3.result);

let phrase4 = concat("Leave HULK ALONE!");
console.log(phrase4.result);
console.log(phrase4.count);

let phrase5 = concat("Go away!");
console.log(phrase5.result);
console.log(phrase2.count);
console.log(phrase4.count);