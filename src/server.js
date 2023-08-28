const express = require('express');

const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const authRouter = require('./routes/auth.router');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'DEV.TO API' });
});

module.exports = app;
