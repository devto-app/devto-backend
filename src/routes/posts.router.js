const express = require('express');

const posts = require('../useCases/post.useCase');

const router = express.Router();

router.get('/', async (req, res) => {
    const { title, user } = req.query;
    const allPosts = await posts.getAll(title, user);
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

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const postUpdated = await posts.updateById(id, data);
        res.json({
            message: 'Post updated',
            data: { post: postUpdated },
        });
    } catch (error) {
        res.status(error.status || 500);
        res -
            json({
                messag: 'Something went wrong 😬',
                error: error.message,
            });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postDeletedById = await posts.removeById(id);
        res.json({
            message: 'Post deleted',
            data: { post: postDeletedById },
        });
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            message: 'Something went wrong 🫥',
            error: error.message,
        });
    }
});

module.exports = router;
