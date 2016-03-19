'use strict';
var funHelper = require('./helpers');
var sess;

/* Password Recovery Handling
 * The following code handles displaying and and API call method
 * for requesting to change password.
 */

/* Displays the password recovery form. */
exports.getForgot = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Forgot Password';
    res.render('forgot', funHelper.jadeObj(sess, req));
};

/* Requests Password Reset */
exports.postForgot = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Reset Password';
    // To-Do: Implement Code.
};

/* Displays Password Reset Comfirmation Form */
exports.getReset = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Reset Password';
    res.render('reset', funHelper.jadeObj(sess, req));
};

/* Handles New Password Setting */
exports.postReset = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Reset Password';
    // To-Do: Implement Code.
};
