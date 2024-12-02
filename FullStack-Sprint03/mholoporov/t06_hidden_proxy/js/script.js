const validator = {
    get(target, property) {
        console.log(`Trying to access the property '${property}'...`);
        return target[property] || false;
    },
    set(target, property, value) {
        console.log(`Setting value '${value}' to '${property}'`);
        if (property === 'age') {
            if (!Number.isInteger(value)) {
                console.error("Uncaught TypeError: The age is not an integer");
                return;
            }
            if (value < 0 || value > 200) {
                console.error("Uncaught RangeError: The age is invalid");
                return;
            }
        }
        target[property] = value;
    }
};