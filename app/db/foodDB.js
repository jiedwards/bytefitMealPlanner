let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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

var Food = module.exports = mongoose.model('Food', foodSchema);

module.exports.getFoods = function(callback, limit){
    Food.find(callback).limit(limit);
}

module.exports.getFoodById = function(id, callback){
    Food.findById(id, callback);
}

module.exports.updateFood = function(id, food, options, callback){
    var query = {_id: id};
    var update = {
        foodDesc: food.foodDesc,
        calories: food.calories,
        carbs: food.carbs,
        fats: food.fats,
        protein: food.protein,
        unitOptionOneDesc: food.unitOptionOneDesc,
        unitOptionOneMeasurement: food.unitOptionOneMeasurement,
        unitOptionTwoDesc: food.unitOptionTwoDesc,
        unitOptionTwoMeasurement: food.unitOptionTwoMeasurement,
        totalSugar: food.totalSugar,
        fiber: food.fiber,
        calcium: food.calcium,
        iron: food.iron,
        phosphorus: food.phosphorus,
        magnesium: food.magnesium,
        potassium: food.potassium,
        sodium: food.sodium,
        zinc: food.zinc,
        copper: food.copper,
        manganese: food.manganese,
        selenium: food.selenium,
        vitaminC: food.vitaminC,
        vitaminB6: food.vitaminB6,
        vitaminB12: food.vitaminB12,
        vitaminA: food.vitaminA,
        vitaminE: food.vitaminE,
        vitaminD: food.vitaminD,
        vitaminK: food.vitaminK,
        cholesterol: food.cholesterol,
        siteVisibility: food.siteVisibility
    }
    console.log("test" + food + "now" + update);
    Food.findOneAndUpdate(query, update, options, callback);
}
mongoose.model('foods', foodSchema);