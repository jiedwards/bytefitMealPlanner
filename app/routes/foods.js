const express = require('express');
const foodRouter = express.Router();

//Food Model
const Food = require('../db/foodDB')

// Retrieves url for newFood page
foodRouter.get('/newFood', (req, res) => (res.render('newFood')));

//New Food Handle
foodRouter.post('/newFood', (req, res) => {
    const {
        foodDesc,
        calories
    } = req.body;
    let errors = [];

    //Check required fields
    if (!foodDesc || !calories) {
        errors.push({
            msg: 'Fill in all fields'
        });
    }

    if (errors.length > 0) {
        res.render('newFood', {
            errors,
            foodDesc,
            calories
        });
    } else {
        //Validation Passed
        Food.findOne({
                foodDesc: foodDesc
            })
            .then(food => {
                if (food) {
                    //User Exists 

                    errors.push({
                        msg: 'Food is already registered'
                    })
                    res.render('newFood', {
                        errors,
                        foodDesc,
                        calories
                    });
                } else {
                    const newFood = new Food({
                        errors,
                        foodDesc,
                        calories
                    })

                    //Save Food
                    newFood.save()
                        .then(food => {
                            console.log(req.body);
                            req.flash('success_msg', 'Food has been successfully added to use locally');
                            res.redirect('newFood');
                        })
                        .catch(err => console.log(err));

                }
            });
    }
});

module.exports = foodRouter;