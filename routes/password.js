'use strict';
var funHelper = require('./helpers');
var sess;

/* Password Recovery Handling
 * The following code handles displaying and and API call method
 * for requesting to change password.
 */

/* Displays the password recovery form. */
exports.getForgot = function(req, res) {
  sess = req.session;
  sess.url = '/';
  sess.user = null;
  sess.title = 'MangaDB: Forgot Password';
  res.render('forgot', funHelper.pugObj(sess, req));
};

/* Displays Password Reset Comfirmation Form */
exports.getReset = function(req, res) {
  sess = req.session;
  sess.url = '/';
  sess.user = null;
  sess.title = 'MangaDB: Reset Password';
  res.render('reset', funHelper.pugObj(sess, req));
};

/*
// Requests Password Reset
exports.postForgot = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Reset Password';
    // To-Do: Implement Code.
};
*/
// Handles New Password Setting
exports.postReset = function (req, res) {
    sess = req.session;
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