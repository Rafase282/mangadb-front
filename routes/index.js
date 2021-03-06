"use strict";
var s = require("underscore.string");
var request = require("request");
var funHelper = require("./helpers");
var sess;

/* Get Home Page */
exports.getHome = function(req, res) {
  sess = req.session;
  sess.url = sess.url || "/";
  sess.title = "MangaDB: Home";
  res.render("index", funHelper.pugObj(sess, req));
};

/* User Authentication Handling
 * The following code handles displaying and and API call method
 * for getting JWT, login and logout forms.
 */

/* Displays Login Form */
exports.getLogIn = function(req, res) {
  sess = req.session;
  sess.url = "/";
  sess.title = "MangaDB: Log In";
  res.render("login", funHelper.pugObj(sess, req));
};

/* Logs User Out */
exports.LogOut = function(req, res) {
  req.session.destroy();
  res.redirect("/");
};

/* Get Token For Login */
exports.getToken = function(req, res) {
  sess = req.session;
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  sess.user = s.titleize(username);
  sess.username = username;
  var options = {
    method: "POST",
    url: process.env.API + "/auth",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    form: {
      username: sess.username,
      password: password
    }
  };

  request(options, function(error, response, body) {
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    sess.token = body.data;
    if (error) throw new Error(error);
    if (!body.success) {
      sess.user = null;
      req.flash("error", body.message);
      res.redirect("/login");
    } else {
      req.flash("success", body.message);
      res.redirect("/user/" + sess.username);
    }
  });
};
