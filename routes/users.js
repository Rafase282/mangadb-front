/* This file handles all user interactions
 * from creating a new user to deleting it
 * and anythign in between.
 */

'use strict';
var request = require("request");
var funHelper = require('./helpers');
var sess;

/* Displays User Profile */
exports.getUserProfile = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    res.render('profile', funHelper.jadeObj(sess, req));
};

/* New User Registration Handling
 * The following code handles displaying and API call method
 * for user creation form.
 */

/* Displays Registration Form. */
exports.getSignUp = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Register';
    res.render('signup', funHelper.jadeObj(sess, req));
};

/* Creates New User */
exports.createUser = function (req, res) {
    var url = req.header('Referer') || '/';
    var msg = 'The account has been created, please log in.';
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'POST',
        url: sess.api + '/users',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: funHelper.userObj(req.body)
    };

    request(options, funHelper.requestFunc(error, response, body, msg, url));
};

/* Profile Update Handling
 * The following code handles displaying and API call method
 * for profile update form.
 */

/* Displays Form to Update User */
exports.getUpdateUser = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    res.render('updateUser', funHelper.jadeObj(sess, req));
};

/* Handles User Update Request */
exports.updateUser = function (req, res) {
    sess = req.session;
    var url = req.header('Referer') || '/';
    var msg = 'The account information has been updated.';
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'PUT',
        url: sess.api + '/users/' + sess.username,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        },
        form: funHelper.userObj(req.body)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        sess.msg = msg;
        res.redirect('/user/' + sess.username);
    });
};

/* Profile Delete Handling
 * The following code handles displaying and API call method
 * for profile deleting comfirmation.
 */

/* Displays Delete Comfirmation Page */
exports.getDeleteUser = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    res.render('deleteUser', funHelper.jadeObj(sess, req));
};

/* Handles User Deletion Request */
exports.deleteUser = function (req, res) {
    sess = req.session;
    var url = req.header('Referer') || '/';
    var msg = 'The account has been deleted.';
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'DELETE',
        url: sess.api + '/users/' + sess.username,
        headers: {
            'x-access-token': sess.token
        }
    };

    if (sess.username === req.params.user.toLowerCase() && req.params.user.toLowerCase() === req.body.username.toLowerCase()) {
        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            }
            console.log(body);
            sess.success = 'The account has been deleted.';
            res.redirect('/logout');
        });
    }
    else {
        sess.error = 'You have input the wrong username, make sure you are deleting your own account and that you spelled it right!'
        res.redirect('/user/' + sess.username + '/delete')
    }
};
