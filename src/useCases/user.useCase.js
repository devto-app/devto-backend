const mongoose = require('mongoose');

const User = require('../models/user.model');

async function getAll() {
    return await User.find();
}

async function create(userData) {
    const newUser = await User.create(userData);
    return newUser;
}

module.exports = { getAll, create };
