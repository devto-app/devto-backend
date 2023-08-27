const express = require('express');

const posts = require('../useCases/post.useCase');

const router = express.Router();

router.get('/', async (req, res) => {
    const allPosts = await posts.getAll();
    res.json({
        message: 'Get all posts from PostsDB',
        data: { posts: allPosts },
    });
});

router.post('/', async (req, res) => {
    try {
        const { title, img, body, user } = req.body;
        const postCreated = await posts.create({
            title,
            img,
            body,
            user,
        });
        res.status(201);
        res.json({
            message: `New post added to PostsDB`,
            data: { post: postCreated },
        });
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(error.status || status);
        res.json({
            message: 'Something went wrong 😵',
            error: error.message,
        });
    }
});

module.exports = router;
