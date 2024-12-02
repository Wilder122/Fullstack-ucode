const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection(config.db);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to database.');
});

module.exports = connection;
