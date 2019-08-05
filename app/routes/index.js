const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

//Welcome page - Initialise URL routing
router.get('', (req, res) => res.render('home'));
router.get('/users', (req, res) => res.render('users'));
router.get('/foods', (req, res) => res.render('foods'));


//User Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.firstName
    }));


module.exports = router;