const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    dob: {
        type: Date,
        required: true
    },
    isGuide: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);