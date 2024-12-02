export class HardWorker {
    constructor() {
        this._name = '';
        this._age = 0;
        this._salary = 0;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set age(age) {
        if (age >= 1 && age < 100) {
            this._age = age;
        }
    }

    get age() {
        return this._age;
    }

    set salary(salary) {
        if (salary >= 100 && salary < 10000) {
            this._salary = salary;
        }
    }

    get salary() {
        return this._salary;
    }

    toObject() {
        return {
            name: this._name,
            age: this._age,
            salary: this._salary
        };
    }
}
