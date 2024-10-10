const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');


// middleware. header'dan jwt token'ı alıp verify eder.
function authenticateToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized'
        });
    }
    const authResponse = authService.verifyToken(token);

    if (!authResponse.success) {
        return res.status(401).send(authResponse);
    }

    req.user = authResponse.data;

    next();

}

module.exports = authenticateToken;