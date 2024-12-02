const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
    const { login, password, confirm_password, full_name, email } = req.body;

    if (password !== confirm_password) {
        return res.send('Passwords do not match.');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.send('Error hashing password.');

        userModel.createUser({ login, password: hashedPassword, full_name, email }, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.send('Login or email already exists.');
                }
                return res.send('Error creating user.');
            }
            res.send('User registered successfully!');
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
