class Timer {
    constructor(title, delay, stopCount) {
        this.title = title;
        this.delay = delay;
        this.stopCount = stopCount;
        this.cyclesLeft = stopCount;
    }

    start() {
        console.log(`Timer ${this.title} started (delay=${this.delay}, stopCount=${this.stopCount})`);
        this.intervalId = setInterval(() => this.tick(), this.delay);
    }

    tick() {
        console.log(`Timer ${this.title} Tick! | cycles left ${--this.cyclesLeft}`);
        if (this.cyclesLeft === 0) {
            this.stop();
        }
    }

    stop() {
        console.log(`Timer ${this.title} stopped`);
        clearInterval(this.intervalId);
    }
}

function runTimer(title, delay, counter) {
    const timer = new Timer(title, delay, counter);
    timer.start();
}