const db = require('../db');

const createUser = (user, callback) => {
    const { login, password, full_name, email } = user;
    const sql = 'INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [login, password, full_name, email], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

module.exports = {
    createUser
};