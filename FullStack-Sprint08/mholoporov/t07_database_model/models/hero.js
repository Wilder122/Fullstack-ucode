const Model = require('../model');

class Hero extends Model {
    static tableName = 'heroes';

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Hero;
