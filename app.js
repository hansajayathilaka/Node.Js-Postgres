const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database')

// test DB
db.authenticate()
    .then(() => console.log('Database connected....'))
    .catch(err => console.log(`Error = ${ err.message }`));


const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('INDEX'));
// Gig Routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, console.log(`Server listen on Port ${ PORT }`));
