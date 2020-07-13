const express = require('express')
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/gigs')


router.get('/', (req, res, next) => {
    Gig.findAll()
        .then(docs => {
            console.log(docs);
            res.send(docs);
        })
        .catch(err => console.log(err));
    // res.send('Hello World');
});

module.exports = router;
