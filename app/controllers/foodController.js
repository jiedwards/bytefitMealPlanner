const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Food = mongoose.model('foods');

router.get('/', (req, res) => {
    console.log("TEST" + req + res);

    res.render("foods/newFood", {
        viewTitle: "Insert New Food to use locally"
    });
});

router.post('/', (req, res) => {
    console.log("TEST" + req + res);
    insertRecord(req, res);
});

function insertRecord(req, res) {
    console.log("TEST" + req + res);

    var food = new Food();

    food.foodId = req.body.foodId;
    food.foodDesc = req.body.foodDesc;
    // user.email = req.body.email;
    // user.password = req.body.password;
    // user.mobileNum = req.body.mobileNum;
    food.save((err, doc) => {
        if (!err) {
            console.log("user submitted");
            res.redirect('users/login');
        } else {
            console.log('Error during user insertion : ' + err);
        }
    });

}

router.get('/list', (req, res) => {
    res.json('from list');
})
module.exports = router;