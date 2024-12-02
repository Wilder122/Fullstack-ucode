const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения: ' + err.stack);
    return;
  }
  console.log('Подключено как id ' + connection.threadId);
});

module.exports = connection;
