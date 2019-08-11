let mongoose = require('mongoose');
/* The Schema is what defines the properties of the object User,
these fields are populated/accessed with information from a POST/GET request. */
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
    totalSugar: {
        type: Number,
        required: false
    },
    fiber: {
        type: Number,
        required: false
    },
    calcium: {
        type: Number,
        required: false
    },
    iron: {
        type: Number,
        required: false
    },
    magnesium: {
        type: Number,
        required: false
    },
    phosphorus: {
        type: Number,
        required: false
    },
    potassium: {
        type: Number,
        required: false
    },
    sodium: {
        type: Number,
        required: false
    },
    zinc: {
        type: Number,
        required: false
    },
    copper: {
        type: Number,
        required: false
    },
    manganese: {
        type: Number,
        required: false
    },
    selenium: {
        type: Number,
        required: false
    },
    vitaminC: {
        type: Number,
        required: false
    },
    vitaminB6: {
        type: Number,
        required: false
    },
    vitaminB12: {
        type: Number,
        required: false
    },
    vitaminA: {
        type: Number,
        required: false
    },
    vitaminE: {
        type: Number,
        required: false
    },
    vitaminD: {
        type: Number,
        required: false
    },
    vitaminK: {
        type: Number,
        required: false
    },
    cholesterol: {
        type: Number,
        required: false
    },
    siteVisibility: {
        type: Boolean,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
});

let Food = module.exports = mongoose.model('Food', foodSchema);

mongoose.model('foods', foodSchema);