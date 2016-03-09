'use strict';
var funHelper = require('./helpers');
var sess;

/* GET home page. */
exports.getHome = function(req, res) {
    sess=req.session;
    res.render('index', {
        title: 'MangaDB',
        user: sess.user,
        userurl: '/'
    });
};

/* GET login page. */
exports.getLogIn = function(req, res) {
    sess=req.session;
    res.render('login', {
        title: 'MangaDB: Log In',
        user: req.body.user,
        userurl: '/'
    });
};

/* GET register page. */
exports.getSignUp = function(req, res) {
    sess=req.session;
    res.render('signup', {
        title: 'MangaDB: Register',
        user: req.user,
        userurl: '/'
    });
};

/* GET home page after loggin out. */
exports.getLogOut = function(req, res) {
    sess=req.session;
    res.render('index', {
        title: 'MangaDB',
        user: sess.user,
        userurl: '/'
    });
};
