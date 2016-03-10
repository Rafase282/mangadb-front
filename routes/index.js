'use strict';
var funHelper = require('./helpers');
var sess;

/* GET home page. */
exports.getHome = function(req, res) {
    sess=req.session;
    res.render('index', {
        title: sess.title,
        user: sess.user,
        url: sess.url || '/'
    });
};

/* GET login page. */
exports.getLogIn = function(req, res) {
    sess=req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Log In';
    res.render('login', {
        title: sess.title,
        url: sess.url
    });
};

/* GET register page. */
exports.getSignUp = function(req, res) {
    sess=req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Register';
    res.render('signup', {
        title: sess.title,
        url: sess.url
    });
};

/* GET home page after loggin out. */
exports.getLogOut = function(req, res) {
    sess=req.session;
    sess.url = '/';
    sess.title = 'MangaDB';
    sess.user = null;
    res.render('index', {
        title: sess.title,
        url: sess.url
    });
};
