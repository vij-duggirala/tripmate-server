/**
 * This file will contain routes about login and signup
 * 1) To login an already existing user
 * 2) To signup a new user
 * 
 * Refer to https://mongoosejs.com/docs/api.html to see how objects are fetched in mongo
 */


const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {createToken} = require('../utils/token');

router
    .route('/login')
    .post(async (req, res) => {
        const body = req.body;
        const user = await User.findOne({phone: body.phone});
        if (!user) {
            return res.status(404).json({
                error: "Phone number not registered"
            });
        }
        user.comparePassword(body.password, (err, matched) => {
            if (err || !matched) return res.status(401).json({
                error: 'Password incorrect'
            });
            return res.status(200).json({
                token: createToken(user)
            })
        })
    });


router
    .route('/signup')
    .post(async (req, res) => {
        const body = req.body;
        const user = new User(body);
        user.save((err, doc) => {
            console.log(err);
            if (err) return res.status(500).json({
                error: "Some error occured"
            })
            return res.status(200).json({
                message: "Successfully signed up"
            })
        });
    });

module.exports = router;
