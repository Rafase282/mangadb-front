"use strict";
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");
var routes = require("./routes/index");
var users = require("./routes/users");
var usersView = require("./routes/usersView");
var password = require("./routes/password");
var funHelper = require("./routes/helpers");
var mangas = require("./routes/mangas");
var mangasView = require("./routes/mangasView");
require("dotenv").config({
  silent: true
});

var app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000
    }
  })
);
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public/images", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "/public"),
    dest: path.join(__dirname, "/public"),
    prefix: "/stylesheets",
    debug: true,
    indentedSyntax: true,
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

var router = express.Router();
app.use("/", router);

// Get the home page
router.route("/").get(routes.getHome);

// Get login form
router
  .route("/login")
  .get(routes.getLogIn)
  .post(routes.getToken);

// Get the home page after loggign out
router.route("/logout").get(routes.LogOut);

// Get the forgotten password page
<<<<<<< HEAD
router.route('/forgot')
  .get(password.getForgot)
  .post(password.postReset);
=======
router
  .route("/forgot")
  .get(password.getForgot)
  .post(password.postForgot);
>>>>>>> 914dc62511be0198ceb634135f78f8da515df48c

// Get the reset password page
router
  .route("/reset")
  .get(password.getReset)
  .post(password.putReset);

// Get the registration page
router
  .route("/signup")
  .get(usersView.getSignUp)
  .post(users.createUser);

// Get User Profile
router
  .route("/user/:username")
  .get(funHelper.isAuthenticated, usersView.getUserProfile);

// Update User Account
router
  .route("/user/:username/update")
  .get(funHelper.isAuthenticated, usersView.getUpdateUser)
  .post(funHelper.isAuthenticated, users.updateUser);

// Delete User Account
router
  .route("/user/:username/delete")
  .get(funHelper.isAuthenticated, usersView.getDeleteUser)
  .post(funHelper.isAuthenticated, users.deleteUser);

// Create New Manga
router
  .route("/user/:username/new")
  .get(funHelper.isAuthenticated, mangasView.getCreateManga)
  .post(funHelper.isAuthenticated, mangas.createManga);

// Update Manga
router
  .route("/user/:username/:manga")
  .get(funHelper.isAuthenticated, mangasView.getUpdateManga)
  .post(funHelper.isAuthenticated, mangas.updateManga);

// Delete All User's Mangas
router
  .route("/user/:username/mangas/delete")
  .get(funHelper.isAuthenticated, mangasView.getDeleteUserMangas)
  .post(funHelper.isAuthenticated, mangas.deleteUserMangas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var sess = req.session;
    sess.url = "/user/" + sess.username;
    sess.title = "MangaDB: " + sess.user;
    sess.api = process.env.API;
    req.flash("error", err.status, err.message);
    res.render("error", funHelper.pugObj(sess, req));
    next();
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var sess = req.session;
  sess.url = "/user/" + sess.username;
  sess.title = "MangaDB: " + sess.user;
  sess.api = process.env.API;
  req.flash("error", err.message);
  res.render("error", funHelper.pugObj(sess, req));
  next();
});
module.exports = app;
