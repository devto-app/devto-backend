const jwt = require('../lib/jwt');

const createError = require('http-errors');

function auth(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new createError(402, 'Token required');
        }

        const token = authorization.replace('Bearer ', '');
        const payload = jwt.verify(token);

        if (!payload) {
            throw new createError(401, 'Could not verify token');
        }
        next();
    } catch (error) {
        res.status(401);
        res.json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
}

module.exports = auth;
