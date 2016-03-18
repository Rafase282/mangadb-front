'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var password = require('./routes/password');
var funHelper = require('./routes/helpers');
var mangas = require('./routes/mangas');
var admin = require('./routes/admin');
require('dotenv').config({
  silent: true
});

var app = express();
app.use(session({
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000
  }
}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
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

// Get the home page
router.route('/')
  .get(routes.getHome);

// Get login form
router.route('/login')
  .get(routes.getLogIn)
  .post(routes.getToken);

// Get the home page after loggign out
router.route('/logout')
  .get(routes.LogOut);

// Get the forgotten password page
router.route('/forgot')
  .get(password.getForgot)
  .post(password.postForgot);

// Get the reset password page
router.route('/reset')
  .get(password.getReset)
  .post(password.postReset);

// Get the registration page
router.route('/signup')
  .get(users.getSignUp)
  .post(users.createUser);

// Get upser Profile
router.route('/user/:user')
  .get(funHelper.isAuthenticated, users.getUserProfile);

// Update User Account
router.route('/user/:user/update')
  .get(funHelper.isAuthenticated, users.getUpdateUser)
  .post(funHelper.isAuthenticated, users.updateUser);

// Delete User Account
router.route('/user/:user/delete')
  .get(funHelper.isAuthenticated, users.getDeleteUser)
  .post(funHelper.isAuthenticated, users.deleteUser);

// User area
router.route('/user/:user/:manga')
  .post(funHelper.isAuthenticated, mangas.createManga) // Create new manga
  .put(funHelper.isAuthenticated, mangas.updateManga) // Update Manga
  .delete(funHelper.isAuthenticated, mangas.deleteManga); // Delete manga


// Admin area
router.route('/admin')
  .get(funHelper.isAuthenticated, admin.getUsersProfiles) // Get list of users
  .put(funHelper.isAuthenticated, users.updateUser) // Update User
  .post(funHelper.isAuthenticated, users.deleteUser) // Delete user
  .delete(funHelper.isAuthenticated, admin.deleteUsers); // Delete Users

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
