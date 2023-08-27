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

async function updateById(id, dataToUpdate) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'Invalid id');
    }
    if (dataToUpdate.user) {
        if (!mongoose.isValidObjectId(dataToUpdate.user)) {
            throw new createError(400, 'Invalid user id');
        }
        const user = await User.findById(dataToUpdate.user);
        if (!user) {
            throw new createError('User not found');
        }
    }

    dataToUpdate.modified = new Date();

    const postUpdated = await Post.findByIdAndUpdate(id, dataToUpdate, {
        new: true,
        runValidator: true,
    });
    if (!postUpdated) {
        throw new createError(404, 'Post not found');
    }
    return postUpdated;
}

module.exports = { getAll, create, updateById };
