class Building {
    constructor(floors, material, address) {
        this.floors = floors;
        this.material = material;
        this.address = address;
    }

    toString() {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`
        ].join('\n');
    }
}

class Tower extends Building {
    constructor(floors, material, address) {
        super(floors, material, address);
        this.hasElevator = false;
        this.arcCapacity = 0;
        this.height = 0;
    }

    set hasElevator(hasElevator) {
        this._hasElevator = hasElevator;
    }

    get hasElevator() {
        return this._hasElevator;
    }

    set arcCapacity(arcCapacity) {
        this._arcCapacity = arcCapacity;
    }

    get arcCapacity() {
        return this._arcCapacity;
    }

    set height(height) {
        this._height = height;
    }

    get height() {
        return this._height;
    }

    getFloorHeight() {
        if (this.floors === 0) return 0;
        return this.height / this.floors;
    }

    toString() {
        return `${super.toString()}\nElevator: ${this.hasElevator ? '+' : '-'}\nArc reactor capacity: ${this.arcCapacity}\nHeight: ${this.height}\nFloor height: ${this.getFloorHeight()}`;
    }
}