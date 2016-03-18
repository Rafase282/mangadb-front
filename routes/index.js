'use strict';
var s = require("underscore.string");
var request = require("request");
var sess;

/* Get Home Page */
exports.getHome = function (req, res) {
    sess = req.session;
    res.render('index', {
        title: sess.title,
        user: sess.user,
        url: sess.url || '/'
    });
};

/* User Authentication Handling
 * The following code handles displaying and handling the profile
 * login and logout forms.
 */

/* Displays Login Form */
exports.getLogIn = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Log In';
    res.render('login', {
        title: sess.title,
        url: sess.url
    });
};

/* Logs User Out */
exports.LogOut = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};

/* Get Token For Login */
exports.getToken = function (req, res) {
    sess = req.session;
    var username = req.body.username;
    var password = req.body.password;
    sess.user = s.titleize(username);
    sess.username = username.toLowerCase();
    var options = {
        method: 'POST',
        url: process.env.API + '/auth',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            username: username,
            password: password
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        sess.token = JSON.parse(body).token;
        res.redirect('/user/' + username);
    });
};