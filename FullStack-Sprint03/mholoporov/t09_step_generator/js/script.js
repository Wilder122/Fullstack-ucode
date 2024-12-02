let previousResult = 1;

function generator() {
    let userInput = prompt(`Previous result: ${previousResult}. Enter a new number:`);
    
    if (isNaN(userInput) || userInput === "") {
        console.error("Invalid number!");
        generator();
    } else {
        let num = Number(userInput);
        if (previousResult + num > 10000) {
            previousResult = 1;
        } else {
            previousResult += num;
        }
        console.log(`Previous result: ${previousResult}`);
        generator();
    }
}

generator();