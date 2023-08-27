const express = require('express');

const usersRouter = require('./routes/users.router');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.json({ message: 'DEV.TO API' });
});

module.exports = app;
