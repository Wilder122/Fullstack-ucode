function Calculator() {
    this.result = 0;
}

Calculator.prototype.init = function(num) {
    this.result = num;
    return this;
}

Calculator.prototype.add = function(num) {
    this.result += num;
    return this;
}

Calculator.prototype.sub = function(num) {
    this.result -= num;
    return this;
}

Calculator.prototype.mul = function(num) {
    this.result *= num;
    return this;
}

Calculator.prototype.div = function(num) {
    if (num !== 0) {
        this.result /= num;
    } else {
        console.error("Division by zero is not allowed.");
    }
    return this;
}

Calculator.prototype.alert = function() {
    var self = this;
    setTimeout(function() {
        alert("Current result: " + self.result);
    }, 5000);
}

const calc = new Calculator();
console.log(calc.init(2).add(2).mul(3).div(4).sub(2).result); // 1
calc.alert();