const db = require('./db');

class Model {
    constructor(attributes = {}) {
        this.attributes = attributes;
    }

    async find(id) {
        const [rows] = await db.execute(`SELECT * FROM ${this.constructor.tableName} WHERE id = ?`, [id]);
        if (rows.length > 0) {
            this.attributes = rows[0];
            return this;
        } else {
            throw new Error('Object not found');
        }
    }

    async delete() {
        if (!this.attributes.id) {
            throw new Error('ID is not defined');
        }

        const [result] = await db.execute(`DELETE FROM ${this.constructor.tableName} WHERE id = ?`, [this.attributes.id]);
        return result;
    }

    async save() {
        const attributes = { ...this.attributes };
    
        if (!attributes.id) {
            const [existingHero] = await db.execute(
                `SELECT * FROM ${this.constructor.tableName} WHERE name = ?`,
                [attributes.name]
            );
            
            if (existingHero.length > 0) {
                throw new Error(`Hero with the name '${attributes.name}' already exists.`);
            }
        }
    
        if (attributes.id) {
            const fields = Object.keys(attributes).filter(key => key !== 'id');
            const values = fields.map(field => attributes[field]);
    
            const setClause = fields.map(field => `${field} = ?`).join(', ');
    
            const [result] = await db.execute(
                `UPDATE ${this.constructor.tableName} SET ${setClause} WHERE id = ?`,
                [...values, attributes.id]
            );
    
            return result;
        } else {
            const fields = Object.keys(attributes);
            const values = Object.values(attributes);
    
            const fieldList = fields.join(', ');
            const placeholderList = fields.map(() => '?').join(', ');
    
            const [result] = await db.execute(
                `INSERT INTO ${this.constructor.tableName} (${fieldList}) VALUES (${placeholderList})`,
                values
            );
    
            this.attributes.id = result.insertId;
            return result;
        }
    }    
}

module.exports = Model;
