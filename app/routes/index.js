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
        userId: req.user.id,
        name: req.user.firstName
    }));

router.get('/foods/newFood', ensureAuthenticated, (req, res) =>
    res.render('newFood', {
        userId: req.user.id,
    }));


module.exports = router;