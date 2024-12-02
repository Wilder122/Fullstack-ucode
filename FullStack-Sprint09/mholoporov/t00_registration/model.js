const db = require('./db.js');

const createUser = (login, password, fullName, email, callback) => {
    const query = 'INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)';

    db.query(query, [login, password, fullName, email], (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
    });
};

const isLoginUnique = (login, callback) => {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE login = ?';

    db.query(query, [login], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0].count === 0);
    });
};

const isEmailUnique = (email, callback) => {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0].count === 0);
    });
};

const getUserByLogin = (login, callback) => {
    const query = 'SELECT * FROM users WHERE login = ?';

    db.query(query, [login], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

module.exports = {
    createUser,
    isLoginUnique,
    isEmailUnique,
    getUserByLogin
};
