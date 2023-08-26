const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trime: true,
        match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    },
    body: {
        type: String,
        required: true,
        minLength: 700,
        maxLength: 2100,
        trim: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        trim: true,
        ref: 'user',
    },
    created: {
        type: Date,
        rqueired: true,
        default: new Date(),
    },
    modified: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model('post', postSchema);
