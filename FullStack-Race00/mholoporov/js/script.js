class Calculator {
    constructor(screen, history) {
        this.screen = screen;
        this.history = history;
        this.memory = 0;
        this.reset();
    }

    reset() {
        this.currentValue = '0';
        this.fullHistory = '';
        this.updateScreen();
        this.updateHistory();
    }

    clear() {
        this.reset();
    }

    appendNumber(number) {
        if (this.currentValue === '0') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
        this.updateScreen();
        this.fullHistory += number;
        this.updateHistory();
    }

    setOperation(operation) {
        if (!this.currentValue || this.currentValue === '-') return;

        if (this.fullHistory !== '' && !this.endsWithOperator()) {
            this.fullHistory += ' ';
        }

        this.fullHistory += operation + ' ';
        this.updateHistory();
        this.currentValue = '';
        this.updateScreen();
    }

    compute() {
        if (this.endsWithOperator()) {
            this.fullHistory = this.fullHistory.slice(0, -3);
        }

        let computation = eval(this.fullHistory.replace(/÷/g, '/'));
        this.currentValue = computation.toString();
        this.fullHistory += '= ' + this.currentValue;
        this.updateHistory();

        this.updateScreen();
        this.fullHistory = '';
    }

    updateScreen() {
        this.screen.value = this.formatNumber(this.currentValue);
    }

    updateHistory() {
        this.history.textContent = this.fullHistory;
    }

    formatNumber(number) {
        return new Intl.NumberFormat('de-DE').format(number);
    }

    percent() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateScreen();
        this.fullHistory += '% ';
        this.updateHistory();
    }

    toggleSign() {
        this.currentValue = this.currentValue.startsWith('-') ? this.currentValue.substring(1) : '-' + this.currentValue;
        this.updateScreen();
        this.fullHistory += ' toggle sign ';
        this.updateHistory();
    }

    endsWithOperator() {
        return ['+', '-', '*', '÷'].some(op => this.fullHistory.trim().endsWith(op));
    }

    factorial() {
        if (this.currentValue !== '') {
            let number = parseInt(this.currentValue, 10);
            let fact = 1;
            for (let i = 2; i <= number; i++) {
                fact *= i;
            }
            this.currentValue = fact.toString();
            this.updateScreen();
        }
    }

    exponentiate(exponent) {
        if (this.currentValue !== '') {
            let base = parseFloat(this.currentValue);
            this.currentValue = Math.pow(base, exponent).toString();
            this.updateScreen();
        }
    }

    squareRoot() {
        if (this.currentValue !== '') {
            this.currentValue = Math.sqrt(parseFloat(this.currentValue)).toString();
            this.updateScreen();
        }
    }

    memoryRecall() {
        this.currentValue = this.memory.toString();
        this.updateScreen();
    }

    memoryClear() {
        this.memory = 0;
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentValue);
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentValue);
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'), document.querySelector('.calculation-history'));
