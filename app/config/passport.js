const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load Usr Model
const User = require('../db/usersDB');
//checks for user
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
         //Match for a user  
         User.findOne({ email: email })
         .then(user => {
             if(!user) {
                 return done(null, false, { message: 'That email is not registered'});
             }
             //If user is matched, password match
             bcrypt.compare(password, user.password, (err, isMatch) => {
                 if(err) throw err;

                 if(isMatch) {
                     return done(null, user);
                 }
                 else {
                     return done(null, false, { message: 'Password Incorrect'});
                 }
             });

         })
         .catch(err => console.log(err)); 
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
        });
        
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
        });
}