const userModel = require('./models/user.js');
const bcrypt = require('bcrypt');
const path = require('path');

exports.registerPage = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
};

exports.register = async (req, res) => {
    const { login, password, confirm_password, full_name, email } = req.body;

    if (password !== confirm_password) {
        return res.send('Passwords do not match.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashing successful');

        await userModel.createUser({ login, password: hashedPassword, full_name, email });
        console.log('User created successfully');

        req.session.user = login;
        return res.redirect('/main');
    } catch (err) {
        console.error('Error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.send('Login or email already exists.');
        }
        return res.send('Error creating user.');
    }
};
