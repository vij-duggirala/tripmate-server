const mongoose = require('mongoose');


const GuideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Guide", GuideSchema)