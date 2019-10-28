"use strict";
var funHelper = require("./helpers");
var sess;
let otp;
let resetUser;

/* Password Recovery Handling
 * The following code handles displaying and and API call method
 * for requesting to change password.
 */

/* Displays the password recovery form. */
exports.getForgot = function(req, res) {
  sess = req.session;
  sess.url = "/";
  sess.user = null;
  sess.title = "MangaDB: Forgot Password";
  res.render("forgot", funHelper.pugObj(sess, req));
};

/* Displays Password Reset Comfirmation Form */
exports.getReset = function(req, res) {
  sess = req.session;
  sess.url = "/";
  sess.user = null;
  sess.title = "MangaDB: Reset Password";
  otp = req.query.token;
  resetUser = req.query.username;
  res.render("reset", funHelper.pugObj(sess, req));
};

// Requests Password Reset
exports.postForgot = function(req, res) {
  sess = req.session;
  sess.url = "/";
  sess.user = null;
  sess.title = "MangaDB: Reset Password";
  sess.host = process.env.HOST;
  sess.api = process.env.API;
  const options = {
    method: "POST",
    url: sess.api + "/reset",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    form: {
      email: req.body.email,
      host: sess.host
    }
  };
  funHelper.makeRequest(options, req, res, sess.url);
};

// Handles New Password Setting
exports.putReset = function(req, res) {
  console.log("the otp is " + otp);
  console.log("the username is " + resetUser);
  console.log("the password is " + req.body.password);
  if (req.body.password === req.body.password2) {
    sess = req.session;
    sess.url = "/users/" + resetUser;
    sess.title = "MangaDB: Password Updated";
    sess.api = process.env.API;
    console.log(sess.api + sess.url);
    var url = "/login";
    var options = {
      method: "PUT",
      url: sess.api + sess.url,
      headers: {
        "x-access-token": otp
      },
      form: {
        password: req.body.password
      }
    };
    funHelper.makeRequest(options, req, res, url);
    otp = null;
    resetUser = null;
  } else {
    req.flash("error", "Your passwords don't match.");
    res.redirect("/forgot");
  }
};
