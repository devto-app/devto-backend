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

async function updateById(postId, dataToUpdate) {
    if (!mongoose.isValidObjectId(postId)) {
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

    const postUpdated = await Post.findByIdAndUpdate(postId, dataToUpdate, {
        new: true,
        runValidator: true,
    });
    if (!postUpdated) {
        throw new createError(404, 'Post not found');
    }
    return postUpdated;
}

async function removeById(postId) {
    if (!mongoose.isValidObjectId(postId)) {
        throw new createError(400, 'Invalid id');
    }
    const postRemoved = await Post.findByIdAndDelete(postId);
    if (!postRemoved) {
        throw new createError(404, 'Post not found');
    }
    return postRemoved;
}

module.exports = { getAll, create, updateById, removeById };
