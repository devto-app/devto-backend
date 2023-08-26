const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: 2,
        maxlLenght: 50,
        trim: true,
    },
    profilePic: {
        type: String,
        required: true,
        trim: true,
        match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model('user', userSchema);
