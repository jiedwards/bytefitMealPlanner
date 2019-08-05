const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');

router.get('/', (req, res) => {
    console.log("TEST3" + req.body + res.body);

    res.render("users/register", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    console.log("TEST3" + req.body + res.body);

    insertRecord(req, res);
});

function insertRecord(req, res) {
    console.log("TEST3" + req.body + res.body);

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