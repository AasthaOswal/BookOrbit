const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token || token.trim() === "") {
        return res.status(403).json({ message: "Unauthorized: Empty or missing token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        req.user = decoded; // Attach decoded token (user info) to the request
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error("Authenticate token error: ",error);
        // Catch-all for any other unexpected error
        return res.status(500).json({ message: "Internal Server Error"});
    }
};

module.exports = { authenticateToken };



