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
<<<<<<< HEAD
*/
=======

>>>>>>> 914dc62511be0198ceb634135f78f8da515df48c
// Handles New Password Setting
exports.putReset = function(req, res) {
  if (req.body.password === req.body.password2) {
    sess = req.session;
<<<<<<< HEAD
    sess.url = '/forgot';
    sess.user = null;
    sess.title = 'MangaDB: Reset Password';
    sess.api = process.env.API;
    sess.host = process.env.HOST;
    console.log(sess)
    const options = {
      method: 'POST',
      url: sess.api + '/reset',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        email: req.body.email,
        host: sess.host
      }
    };
    funHelper.makeRequest(options, req, res, sess.url);
};
=======
    sess.url = "/users/" + resetUser;
    sess.title = "MangaDB: Password Updated";
    sess.api = process.env.API;
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
>>>>>>> 914dc62511be0198ceb634135f78f8da515df48c
