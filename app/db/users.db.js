const mongoose = require('mongoose');

    var userSchema = new mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        mobileNum: {
            type: Number
        }
    });

    mongoose.model('users', userSchema);