const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//User Model
const User = require('../db/usersDB')

//Home Page
router.get('/home', (req, res) => (res.render('home')));

//Login Page
router.get('/login', (req, res) => (res.render('login')));

//Register Page
router.get('/register', (req, res) => (res.render('register')));

// Register Handle
router.post('/register', (req, res) => {
    const { firstName, lastName, email, mobileNum, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (!firstName || !lastName || !email || !mobileNum || !password || !password2) {
        errors.push({ msg: 'Fill in all fields' });
    }

    //Check passwords match

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match, try again.' });
    }

    //Check pass length

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            lastName,
            email,
            mobileNum,
            password,
            password2
        });
    }
    else {
        //Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //User Exists 
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        firstName,
                        lastName,
                        email,
                        mobileNum,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        errors,
                        firstName,
                        lastName,
                        email,
                        mobileNum,
                        password,
                        password2
                    })

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hashed
                            newUser.password = hash;

                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in.');
                                    res.redirect('./login');
                                })
                                .catch(err => console.log(err));
                        }));

                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;