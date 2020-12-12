const jwt = require('jsonwebtoken');


const createToken = (user) => {
    return jwt.sign((String(user._id)), process.env.JWT_SECRET);
}

const decodeToken = (token) => {
    return jwt.decode(token, process.env.JWT_SECRET);
}


module.exports = {
    decodeToken,
    createToken
}