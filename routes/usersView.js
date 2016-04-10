/* This file handles all user interactions
 * from creating a new user to deleting it
 * and anythign in between.
 */

'use strict';
var funHelper = require('./helpers');
var sess;

/* Displays User Profile */
exports.getUserProfile = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    res.render('profile', funHelper.pugObj(sess, req));
};

/* Displays Registration Form. */
exports.getSignUp = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Register';
    sess.button = 'Create User';
    sess.header = 'Create Account';
    res.render('editUser', funHelper.pugObj(sess, req));
};

/* Displays Form to Update User */
exports.getUpdateUser = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    sess.button = 'Update User Information';
    sess.header = 'Update User';
    res.render('editUser', funHelper.pugObj(sess, req));
};

/* Displays Delete Comfirmation Page */
exports.getDeleteUser = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    sess.header = 'Delete User Account';
    sess.button = 'Delete Account';
    res.render('deleteUser', funHelper.pugObj(sess, req));
};