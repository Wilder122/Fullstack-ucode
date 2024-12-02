const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`
      <h1>Welcome ${req.session.user.role}</h1>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.sendFile(__dirname + '/public/login.html');
  }
});

app.post('/login', (req, res) => {
  const { login, password } = req.body;
  userModel.getUserByLogin(login, (err, user) => {
    if (err || !user) {
      return res.send('Invalid login');
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.send('Invalid password');
      }

      req.session.user = {
        login: user.login,
        role: user.role 
      };
      res.redirect('/');
    });
  });
});

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`
      <h1>Welcome, ${req.session.user.login}</h1>
      <h2>Your role: ${req.session.user.role}</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.sendFile(__dirname + '/public/login.html');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
