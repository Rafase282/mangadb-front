// server.js
'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
require('dotenv').config({
  silent: true
});

// configure the view
app.use('/public', express.static(process.cwd() + '/public'));

// REGISTER OUR ROUTES -------------------------------
var router = express.Router(); // get an instance of the express Router

app.use('/', router);
router.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  });
  
router.route('/signup')
  .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/signup.html');
  });



// CONFIGURE & START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080; // set our port
app.listen(port, function() {
  console.log('Node.js listening on port ' + port);
});