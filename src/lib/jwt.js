const jsonWebToken = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function sign(payload = {}) {
    return jsonWebToken.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

function verify(token) {
    return jsonWebToken.verify(token, JWT_SECRET);
}

module.exports = { sign, verify };
