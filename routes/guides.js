/**
 * This file will contain routes about guides
 * 1) To get the list of guides based on filters --------------------> priority
 * 2) To book a guide                            --------------------> priority
 * 3) To get the details of a particular guide
 * 4) To rate a guide
 * 
 * Refer to https://mongoosejs.com/docs/api.html to see how objects are fetched in mongo
 */


const express = require('express');
const router = express.Router();
const Guide = require('../models/guide');


router
    .route('/guide/register')
    .post(async (req, res) => {
        const body = req.body;
        if (!req.user.isGuide) {
            return res.status(401).json({
                error: "User is not registered as a guide"
            });
        }
        const guide = new Guide({...body, user: req.user._id, rating: 0});
        guide.save((err, doc) => {
            if (err) return res.status(500).json({
                error: "Some error occured"
            })
            return res.status(200).json({
                message: "Successfully created a guide profile"
            })
        });
    });


router
    .route('/guides')
    .get(async (req, res) => {
        const query = req.query;
        const filter = {location: query.location};
        if ('gender' in query) filter['gender'] = query.gender;
        const guides = await Guide.find(filter).populate({path: 'user', select: '-password'});
        return res.status(201).json({
            guides
        });
    });

module.exports = router;