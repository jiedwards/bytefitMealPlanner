const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Welcome page
router.get('', (req, res) => res.render('home'));

router.get('/users', (req, res) => res.render('users'));

//User Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.firstName
    }));


module.exports = router;