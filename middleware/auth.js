const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function
module.exports = function(req, res, next) {
    // getting token from header for accessing protected routes
    const token = req.header('x-auth-token');

    // checking if token exists
    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    // verifying token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // taking request object and assigning value to user
        req.user = decoded.user;
        
        // standard middleware call to next
        next();
    } catch(err) {
        res.status(401).json({msg: "Token is not valid"});
    };
};