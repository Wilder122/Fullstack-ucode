const mysql = require('mysql2/promise');

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '645864',
  database: 'ucode_web'
});

module.exports = dbPool;
