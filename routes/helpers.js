/* This file handles additonal functions
 * that are needed across the app.
 */
'use strict';

// Checks to make sure used is logged in
exports.isAuthenticated = function (req, res, next) {
    // Check to see if there is there is a user in session
    var url = req.header('Referer') || '/';
    if (req.session.user !== undefined && req.session.user !== null &&
        req.session.user.toLowerCase() === req.params.user.toLowerCase()) {
        return next();
    }
    req.flash('info', 'Your session has either timed out or you have yet to ' +
        'log in. Please log in to go to your profile.');
    res.redirect(url);
};

// Sets complete manga object
exports.mangaObj = function (manga) {
    return {
        title: manga.title,
        author: manga.author,
        url: manga.url,
        userStatus: manga.userStatus,
        type: manga.type,
        categories: manga.categories,
        chapter: manga.chapter,
        seriesStatus: manga.seriesStatus,
        plot: manga.plot,
        altName: manga.altName,
        direction: manga.direction,
        thumbnail: manga.thumbnail
    };
};

// Sets complete manga object
exports.userObj = function (user) {
    return {
        username: user.username,
        password: user.password,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    };
};

// Sets complete manga object
exports.jadeObj = function (sess, req) {
    return {
        title: sess.title,
        user: sess.user,
        url: sess.url,
        token: sess.token,
        api: sess.api,
        username: sess.username,
        header: sess.header,
        button: sess.button,
        msg: {
            error: req.flash('error'),
            info: req.flash('info'),
            success: req.flash('success')
        }
    };
};

exports.newUserMsg = function newUserMsg(req, res, body) {
    // Displays error messages for new user creation.
    var url = req.header('Referer') || '/';
    if (typeof body === 'string') {
        body = JSON.parse(body);
    }
    if (body.message.message || body.message.code === 400) {
        // Empty form or missing fields
        req.flash('error', 'Don\'t leave empty fields, ' +
            'fill the form properly!');
        res.redirect(url);
    } else if (body.message.code === 11000) {
        // Duplicated Key (Username or E-Mail)
        var msg = body.message.errmsg.split(': ');
        var msg2 = msg[3].split('"');
        msg = 'We already have ' + msg2[1] +
            ' in the system, try a different one.';
        req.flash('error', msg);
        res.redirect(url);
    } else {
        // Invalid E-mail Case
        req.flash('error', body.message);
        res.redirect(url);
    }
}