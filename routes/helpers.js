/* This file handles additonal functions
 * that are needed across the app.
 */
'use strict';

// Checks to make sure used is logged in
exports.isAuthenticated = function (req, res, next) {
    // Check to see if there is there is a user in session
    var backURL = req.header('Referer') || '/';
    if (req.session.user !== undefined && req.session.user !== null &&
        req.session.user.toLowerCase() === req.params.user.toLowerCase()) {
        return next();
    }
    res.redirect(backURL);
};

// Sets complete manga object
exports.mangaObj = function (req) {
    return {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        userStatus: req.body.userStatus,
        type: req.body.type,
        categories: req.body.categories,
        chapter: req.body.chapter,
        seriesStatus: req.body.seriesStatus,
        plot: req.body.plot,
        altName: req.body.altName,
        direction: req.body.direction,
        thumbnail: req.body.thumbnail
    };
};

// Sets complete manga object
exports.userObj = function (req) {
    return {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
};

// Sets complete manga object
exports.jadeObj = function (sess) {
    return {
        title: sess.title,
        user: sess.user,
        url: sess.url,
        token: sess.token,
        api: sess.api,
        username: sess.username
    };
};