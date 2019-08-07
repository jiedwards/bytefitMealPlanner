const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');

router.get('/', (req, res) => {
    console.log("TEST3" + req.body + res.body);

    //Generates a new page as part of the users context
    res.render("users/register", {
        viewTitle: "Insert Employee"
    });
});
    //Controls what happens when a post request is made on the page. It passes the information into the insertRecord function.
router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    //populates the user object with the values in the request, and attempts to save the object as a new user.
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.mobileNum = req.body.mobileNum;
    user.save((err, doc) => {
        if (!err) {
            console.log("user submitted");
            res.redirect('users/list');
        }
        else {
            console.log('Error during user insertion : ' + err);
        }
    });

}

router.get('/list', (req, res) => {
    res.json('from list');
})
module.exports = router;