const express = require('express');

const users = require('../useCases/user.useCase');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allUsers = await users.getAll();
        res.json({
            message: 'Get all users from UsersDB',
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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getUserById = await users.getById(id);
        res.json({
            message: `Get user ${getUserById.name} from UsersDB`,
            data: { user: getUserById },
        });
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            message: 'Something went wrong 😭',
            error: error.message,
        });
    }
});

module.exports = router;
