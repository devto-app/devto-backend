const express = require('express');

const auth = require('../useCases/auth.useCase');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await auth.login(email, password);
        res.json({
            message: 'Logged in successfully',
            data: { token },
        });
    } catch (error) {
        res.status(500);
        res.json({
            message: 'Something went wrong 😥',
            error: error.message,
        });
    }
});

module.exports = router;
