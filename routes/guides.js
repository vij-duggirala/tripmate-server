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

router
    .route('/guides')
    .get((req, res) => {
        return res.status(201).json({});
    });

module.exports = router;