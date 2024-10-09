const createDatabase = require('../configs/database');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const getUserById = async (userId) => {
    try {
        const db = await createDatabase();
        const user = await db.collections('users').findOne({_id: userId});
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        return null;
    }
};


const login = async (loginDto) => {
    try {
        const {email, password} = loginDto;
        if (!email || !password) {
            return {message: 'Email and password are required'};
        }
        const db = await createDatabase();

        const userCollection = db.collections.users;
        const user = await userCollection.findOne({
            selector: {
                email: email
            }
        }).exec();

        if (!user) {
            return {
                success: false,
                message: 'User not found',
                data: null
            };
        }

        if (user.password !== password) {
            return {
                success: false,
                message: 'Password does not match',
                data: null
            };
        }

        const token = createToken(user);
        return {
            success: true,
            message: 'Logged in succesfully',
            data: {
                email: user.email,
                token
            }
        };
    } catch (error) {
        return {message: 'Internal server error'};
    }
}

const createToken = (user) => {
    const secret = config.secret;
    const option = {
        expiresIn: '1d' // 1 günlük token
    }

    return jwt.sign({user}, secret, option);

}

// JWT token ile verify işlemi
const verifyToken = (token) => {
    const secret = config.secret;
    try {
        const decoded = jwt.verify(token, secret);
        return {
            success: true,
            data: decoded.email
        };
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return {
                success: false,
                message: 'Token expired'
            };
        }else if(error.name === 'JsonWebTokenError') {
            return {
                success: false,
                message: 'Token is not valid'
            };
        }
        return {
            success: false,
            message: error.message
        };
    }
}

module.exports = {
    getUserById,
    login,
    verifyToken
};