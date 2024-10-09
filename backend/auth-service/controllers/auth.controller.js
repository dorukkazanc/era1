const authService = require('../services/auth.service')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authResponse = await authService.login({
            email: email,
            password: password
        });
        res.status(200).json(authResponse);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login
}