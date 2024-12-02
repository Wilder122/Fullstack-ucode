const db = require('../db');

const userModel = {
  getUserByLogin: (login, callback) => {
    const query = 'SELECT login, password, role FROM users WHERE login = ?';
    db.query(query, [login], (err, results) => {
      if (err || results.length === 0) {
        return callback(err || new Error('User not found'));
      }
      callback(null, results[0]);
    });
  }
};

module.exports = userModel;