let mongoose = require('mongoose');
/* The Schema is what defines the properties of the object User,
these fields are populated/accessed with information from a POST/GET request. */
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
    },
    calResult: {
        type: Number,
        required: false
    }
});

let User = module.exports = mongoose.model('User', userSchema);

mongoose.model('users', userSchema);