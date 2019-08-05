let mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    foodDesc: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: false
    },
    fats: {
        type: Number,
        required: false
    },
    protein: {
        type: Number,
        required: false
    },
    unitOptionOneDesc: {
        type: String,
        required: false
    },
    unitOptionOneMeasurement: {
        type: Number,
        required: false
    },
    unitOptionTwoDesc: {
        type: String,
        required: false
    },
    unitOptionTwoMeasurement: {
        type: Number,
        required: false
    },
    siteVisibility: {
        type: Boolean,
        required: false
    },
});

let Food = module.exports = mongoose.model('Food', foodSchema);

mongoose.model('foods', foodSchema);