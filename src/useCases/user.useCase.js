const mongoose = require('mongoose');

const User = require('../models/user.model');
const createError = require('http-errors');

async function getAll() {
    return await User.find();
}

async function create(userData) {
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) throw new createError(412, 'User already exists');
    const newUser = await User.create(userData);
    return newUser;
}

async function getById(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'Invalid id');
    }
    const user = await User.findById(id);
    if (!user) {
        throw new createError(404, 'User not found');
    }
    return user;
}

module.exports = { getAll, create, getById };
