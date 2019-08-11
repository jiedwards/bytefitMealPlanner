const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Food = mongoose.model('foods');

//base url for foods context
router.get('/', (req, res) => {

    //Generates a new page as part of the foods context
    res.render("foods/newFood", {
        viewTitle: "Insert New Food to use locally"
    });
});
    //Controls what happens when a post request is made on the page. It passes the information into the insertRecord function.
router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {

    var food = new Food();

    food.foodId = req.body.foodId;
    food.foodDesc = req.body.foodDesc;
    food.save((err, doc) => {
        if (!err) {
            console.log("food submitted");
            res.redirect('users/login');
        } else {
            console.log('Error during food insertion : ' + err);
        }
    });

}

router.get('/list', (req, res) => {
    res.json('from list');
})
module.exports = router;