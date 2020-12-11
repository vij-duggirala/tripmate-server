/**
 * This file will contain routes about login and signup
 * 1) To login an already existing user
 * 2) To signup a new user
 * 
 * Refer to https://mongoosejs.com/docs/api.html to see how objects are fetched in mongo
 */


const express = require('express');
const router = express.Router();

router
    .route('/login')
    .get((req, res) => {
        res.cookie('user', 'replace-this-by-the-id-of-user', {
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({});
    });


router
    .route('/signup')
    .get((req, res) => {
        return res.status(201).json({});
    });

module.exports = router;