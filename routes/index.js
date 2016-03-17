'use strict';
var s = require("underscore.string");
var request = require("request");
var sess;

/* GET home page. */
exports.getHome = function (req, res) {
    sess = req.session;
    res.render('index', {
        title: sess.title,
        user: sess.user,
        url: sess.url || '/'
    });
};

/* GET login page. */
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

/* GET register page. */
exports.getSignUp = function (req, res) {
    sess = req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Register';
    res.render('signup', {
        title: sess.title,
        url: sess.url
    });
};

/* GET home page after loggin out. */
exports.LogOut = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};

/* GET token from login */
exports.getToken = function (req, res) {
    sess = req.session;
    var username = req.body.username;
    var password = req.body.password;
    sess.user = s.titleize(username);
    sess.username = username;
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