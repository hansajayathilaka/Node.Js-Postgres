const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')


// Database
const db = require('./config/database')

// test DB
db.authenticate()
    .then(() => console.log('Database connected....'))
    .catch(err => console.log(`Error = ${ err.message }`));


const app = express();
const PORT = process.env.PORT || 5000;

// Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig Routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, console.log(`Server listen on Port ${ PORT }`));
