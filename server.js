// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
//app.use('/api/users', userApiRoutes);

//app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// Event creation page 
app.get('/', (req, res) => {
  
  res.render('index');

});

// Event info 
app.post('/', (req, res) => {
  const {
    eventTitle, eventDesc, organizerName, organizerEmail, eventDate, eventTime
  } = req.body;
  res.render('event', {
    title: eventTitle, description: eventDesc, name: organizerName, email: organizerEmail, date: eventDate, time: eventTime})
});



app.listen(PORT, () => {
  console.log(`Schoodle app listening on port ${PORT}`);
});
