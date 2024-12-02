const User = require('./models/user.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('./config.json');
const path = require('path');

async function sendEmail(email, subject, htmlContent) {
    let Account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: Account.user,
            pass: Account.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '<goloperovns@gmail.com>',
        to: email,
        subject: subject,
        html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

exports.loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
};

exports.login = async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.getUserByLogin(login);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            return res.redirect('/main');
        }
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    } catch (error) {
        console.error('Login error:', error);
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
};

exports.reminderPage = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reminder.html'));
};

exports.sendReminder = async (req, res) => {
    const { login } = req.body;
    try {
        const user = await User.getUserByLogin(login);
        if (user) {
            const htmlContent = `<p>Your password is: <strong>${user.password}</strong></p>`;
            await sendEmail(user.email, 'Password Reminder', htmlContent);
            return res.sendFile(path.join(__dirname, 'views', 'success.html'));
        }
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    } catch (error) {
        console.error('Reminder error:', error);
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/main');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/login');
    });
};
