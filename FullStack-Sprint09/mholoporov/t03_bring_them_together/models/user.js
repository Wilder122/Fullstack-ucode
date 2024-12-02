const dbPool = require('../db');

const UserModel = {
  async getUserByLogin(login) {
    const [rows] = await dbPool.query('SELECT * FROM users WHERE login = ?', [login]);
    return rows.length > 0 ? rows[0] : null;
  },

  async createUser(user) {
    const { login, password, full_name, email } = user;
    const sql = 'INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await dbPool.query(sql, [login, password, full_name, email]);
      return result;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = UserModel;
