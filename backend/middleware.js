const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No authorization header or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({ message: 'Invalid token payload' });
        }
        
    } catch (err) {
        console.error('Authentication error:', err); // Log the error for debugging
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    authMiddleware
};
