let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNum: {
        type: Number,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);

mongoose.model('users', userSchema);