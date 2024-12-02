function total(addCount, addPrice, currentTotal = 0) {
    var newTotal = currentTotal + (addCount * addPrice);
    return newTotal;
}

let sum = total(1, 0.1);
sum = total(1, 0.2, sum);
sum = total(1, 0.78, sum);
console.log(sum); // Output the total sum, expected result: 1.08