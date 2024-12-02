const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const userModel = require('./models/user');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/reminder', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.send('User not found');
    }

    let account = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass 
      }
    });

    let info = await transporter.sendMail({
      from: '"Password Reminder" <no-reply@example.com>',
      to: user.email,
      subject: "Your Password Reminder",
      text: `Your password is: ${user.password}`,
      html: `<p>Your password is: <b>${user.password}</b></p>`
    });

    console.log("Message sent: %s", nodemailer.getTestMessageUrl(info));
    res.send('Password reminder sent to your email');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while sending email');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

