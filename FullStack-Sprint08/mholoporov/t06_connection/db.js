const mysql = require('mysql2');
const config = require('./config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: config.waitForConnections,
    connectionLimit: config.connectionLimit,
    queueLimit: config.queueLimit
});

module.exports = pool.promise();



// npm install mysql2