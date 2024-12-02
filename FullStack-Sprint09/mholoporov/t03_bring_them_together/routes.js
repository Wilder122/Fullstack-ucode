const express = require('express');
const router = express.Router();
const authController = require('./authController');
const userController = require('./userController');
const mainController = require('./mainController');

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/register', userController.registerPage);
router.post('/register', userController.register);

router.get('/main', mainController.mainPage);
router.get('/reminder', authController.reminderPage);
router.post('/reminder', authController.sendReminder);
router.use('/',(req, res )=> {
    res.redirect('/login');
})

module.exports = router;
