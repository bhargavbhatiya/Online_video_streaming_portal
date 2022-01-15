const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    // res.render('welcome');
    // res.send('Welcome to the backend');
    res.render('dash');

});

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dash', {
        name: req.user.name
    })
});

module.exports = router;