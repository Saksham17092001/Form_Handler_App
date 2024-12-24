const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    
    try {
        const tokenString = token.split(' ')[1];
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.userId = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
