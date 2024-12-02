class Model {
    constructor(tableName) {
      this.tableName = tableName;
    }
  
    find(query, callback) {
      const sql = `SELECT * FROM ${this.tableName} WHERE ?`;
      db.query(sql, query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      });
    }
  
    delete(query, callback) {
      const sql = `DELETE FROM ${this.tableName} WHERE ?`;
      db.query(sql, query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      });
    }
  
    save(data, callback) {
      const sql = `INSERT INTO ${this.tableName} SET ?`;
      db.query(sql, data, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      });
    }
  }
  
  module.exports = Model;
  