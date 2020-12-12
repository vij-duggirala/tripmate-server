/**
 * This middleware will check for the id in the cookie, then fetch the related user, and assign it to
 * the req.user property
 */

const User = require('../models/user');
const {decodeToken} = require('../utils/token');

const authMiddleware = async (req, res, next) => {
    let token = req.headers['x-api-token'];
    if (token !== undefined) {
        token = decodeToken(token);
        const user = await User.findById(token);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized User"
            })
        }
        req.user = user;
        next();
    }
    else return res.status(401).json({
        success: false,
        error: "Unauthorized User"
    })
}


module.exports = authMiddleware;