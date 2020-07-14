const express = require('express')
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/gigs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


// Get gig list
router.get('/', (req, res, next) => {
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err));
    // res.send('Hello World');
});


// Display Add gig form
router.get('/add', (req, res, next) => {
    res.render('add');
});


// Add a gig
router.post('/add', (req, res, next) => {
    let {title, technologies, budget, contact_email, description} = req.body;
    let errors = []

    // Validation
    if(!title){
        errors.push({ text: 'Please add a title.' })
    }
    if(!technologies){
        errors.push({ text: 'Please add some technologies.' })
    }
    if(!description){
        errors.push({ text: 'Please add a description.' })
    }
    if(!contact_email){
        errors.push({ text: 'Please add a contact email.' })
    }

    // Check for errors
    if(errors.length === 0){
        if(!budget){
            budget = 'Unknown';
        } else {
            budget = `$${ budget }`;
        }

        // Make Lower case
        technologies = technologies.toLowerCase().replace(/, /g, ',')

        // Insert into table
        Gig.create({
            title,
            technologies,
            budget,
            contact_email,
            description
        })
            .then(doc => {
                res.redirect('/gigs');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            contact_email,
            description
        });
    }

});


// Search for gigs
router.get('/search', (req, res, next) => {
    let { term } = req.query;
    term = term.toLowerCase()
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => {
            res.render('gigs', { gigs })
        })
        .catch(err => console.log(err.message))
});

module.exports = router;
