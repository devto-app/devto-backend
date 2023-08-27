const express = require('express');

const users = require('../useCases/user.useCase');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allUsers = await users.getAll();
        res.json({
            message: 'GET all users fromd UsersDB',
            data: { users: allUsers },
        });
    } catch (error) {
        res.status(500);
        res.json({
            messag: 'Something went wrong 😟',
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, profilePic, email, password, created } = req.body;
        const userCreated = await users.create({
            name,
            profilePic,
            email,
            password,
            created,
        });
        res.status(201);
        res.json({
            message: `User '${userCreated.name}' created successfully`,
            data: { user: userCreated },
        });
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status);
        res.json({
            message: 'Something went wrong 😿',
            error: error.message,
        });
    }
});

module.exports = router;
