const express = require('express');
const foodRouter = express.Router();

//Food Model
const Food = require('../db/foodDB')


// Retrieves url for newFood page
foodRouter.get('/newFood', (req, res) => (res.render('newFood')));

//New Food Handle
foodRouter.post('/newFood', (req, res) => {
    console.log(req.body);
    const {
        foodDesc, calories, carbs, fats, protein, unitOptionOneDesc, unitOptionOneMeasurement,
        unitOptionTwoDesc, unitOptionTwoMeasurement, fiber, calcium, iron, magnesium,
        phosphorus, potassium, sodium, zinc, copper, manganese, selenium, vitaminC, vitaminB6,
        vitaminB12, vitaminA, vitaminE, vitaminD, vitaminK, cholesterol, userId
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
                    // In this case, the food exists and an error message is thrown.
                    errors.push({
                        msg: 'Food is already registered'
                    })
                    res.render('newFood', {
                        errors,
                        foodDesc,
                        calories, carbs, fats, protein, unitOptionOneDesc, unitOptionOneMeasurement,
                        unitOptionTwoDesc, unitOptionTwoMeasurement, fiber, calcium, iron, magnesium,
                        phosphorus, potassium, sodium, zinc, copper, manganese, selenium, vitaminC, vitaminB6,
                        vitaminB12, vitaminA, vitaminE, vitaminD, vitaminK, cholesterol, userId
                    });
                } else {
                    //Alternatively a new food object is made, the request values are stored and this food will be saved.
                    const newFood = new Food({
                        errors,
                        foodDesc,
                        calories, carbs, fats, protein, unitOptionOneDesc, unitOptionOneMeasurement,
                        unitOptionTwoDesc, unitOptionTwoMeasurement, fiber, calcium, iron, magnesium,
                        phosphorus, potassium, sodium, zinc, copper, manganese, selenium, vitaminC, vitaminB6,
                        vitaminB12, vitaminA, vitaminE, vitaminD, vitaminK, cholesterol, userId
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