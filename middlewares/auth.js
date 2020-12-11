/**
 * This middleware will check for the id in the cookie, then fetch the related user, and assign it to
 * the req.user property
 */

const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    if (req.signedCookies.user !== undefined) {
        const user = await User.findById(req.signedCookies.user);
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