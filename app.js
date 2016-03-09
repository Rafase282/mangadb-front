'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session')
var routes = require('./routes/index');
var users = require('./routes/users');
var password = require('./routes/password');
require('dotenv').config({
  silent: true
});

var app = express();
app.use(session({
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, '/public'),
  dest: path.join(__dirname, '/public'),
  prefix: '/stylesheets',
  debug: true,
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
app.use('/', router);

var sess;

// Get the home page
router.route('/')
  .get(routes.getHome);
  
// Get login form
router.route('/login')
  .get(routes.getLogIn)
  .post(users.getToken);
  
// Get the home page after loggign out
router.route('/logout')
  .get(routes.getLogOut);
  
// Get the forgotten password page
router.route('/forgot')
  .get(password.getForgot);
  
// Get the reset password page
router.route('/reset')
  .get(password.getReset);
  
// Get the registration page
router.route('/signup')
  .get(routes.getSignUp);

// Get the registration page
router.route('/user/:user')
  .get(users.getUserProfile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
