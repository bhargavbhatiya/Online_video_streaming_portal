const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')


//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.redirect('forgot'));

//------------ Reset Password Handle ------------//
// on email link submit
router.get('/forgot/:token', authController.gotoReset);

//------------ Forgot Password Handle ------------//
//on reset password button click
router.post('/forgot', authController.forgotPassword);



//------------ Reset Password Route ------------//
// router.get('/reset/:id', authController.resetpass);
router.get('/reset/:id', (req, res) => {
    console.log(req.headers.host);
    res.redirect(`http://localhost:3000/auth/reset/${req.params.id}`);
});

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);



//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);



//------------ Register Route ------------//
router.get('/register', (req, res) => res.redirect('http://localhost:3000/auth/register'));

//------------ Register POST Handle ------------//
router.post('/register', authController.registerHandle);



//------------ Login Route ------------//
router.get('/login', (req, res) => {
    console.log("Login route called");
    res.redirect('http://localhost:3000/auth/login/');
});

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);



// router.get('/login/:id', authController.getLogin);
//------------ Logout GET Handle ------------//
router.post('/logout', authController.logoutHandle);

module.exports = router;
