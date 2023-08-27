const mongoose = require('mongoose');

const User = require('../models/user.model');

async function getAll() {
    return await User.find();
}

function create(userData) {
    const newUser = User.create(userData);
    return newUser;
}

module.exports = { getAll, create };
