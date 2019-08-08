const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');

const locals = require('passport-local');

const {
    authenticated
} = require('../config/auth');

//Initialise URL routing, and pass variable to the homepage
router.get('/', (req, res) => res.render('home', {
    userId: req.user,
}));
router.get('/users', (req, res) => res.render('users'));
router.get('/foods', (req, res) => res.render('foods'));

//User Dashboard (must be authenticated), the render passes through user values by setting them as variables.
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        session: req.session,
        userId: req.user.id,
        name: req.user.firstName
    })
);

//New food page (must be authenticated), the render passes through user values by setting them as variables.
router.get('/foods/newFood', ensureAuthenticated, (req, res) =>
    res.render('newFood', {
        userId: req.user.id,
    }));



module.exports = router;