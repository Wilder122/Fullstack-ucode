const EatException = require('./eat-exception');

class Ingestion {
    constructor(meal_type, day_of_diet) {
        this.meal_type = meal_type;
        this.day_of_diet = day_of_diet;
        this.products = [];
    }

    setProduct(product) {
        this.products.push(product);
    }

    getProductInfo(productName) {
        const product = this.products.find(p => p.name === productName);
        if (!product) {
            return null;
        }
        return { name: product.name, kcal: product.kcal_per_portion };
    }

    getFromFridge(productName) {
        const product = this.products.find(p => p.name === productName);
        if (!product) {
            console.log(`Product ${productName} not found!`);
            return;
        }
        if (product.isJunkFood()) {
            throw new EatException(`Too many calories in ${product.name} for ${this.meal_type}!`);
        }
    }
}

module.exports = { Ingestion };