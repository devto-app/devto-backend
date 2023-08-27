const mongoose = require('mongoose');

const Post = require('../models/post.model');
const User = require('../models/user.model');
const createError = require('http-errors');

async function getAll() {
    // filter + RegExp + isValidObject + populate
    return await Post.find();
}

async function create(postData) {
    if (!mongoose.isValidObjectId(postData.user)) {
        throw new createError(400, 'Invalid id');
    }
    const userExists = await User.findById(postData.user);
    if (!userExists) {
        throw new createError(404, 'User not found');
    }
    return await Post.create(postData);
}

module.exports = { getAll, create };
