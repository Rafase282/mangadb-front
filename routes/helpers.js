/* This file handles additonal functions
 * that are needed across the app.
 */

'use strict';
var s = require("underscore.string");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./storage');
}

// Retrieves the token from local storage and returns it.
exports.getToken = function(name) {
    return localStorage.getItem(name);
};

// Stores token to local storage
exports.setToken = function(name, info) {
    localStorage.setItem(name, info);
};

// Retrieves the token from local storage and returns it.
exports.getObj = function(name) {
    return JSON.parse(localStorage.getItem(name));
};

// Removes manga from display
exports.clean = function() {
    $(".mangas").empty();
};

// Deletes the token from local storage and removes manga from display.
exports.logOut = function() {
    localStorage.removeItem("token");
    localStorage.removeItem("prevManga");
    //clean();
};

// Checks to make sure used is logged in
exports.isAuthenticated = function(req, res, next) {
    // Check to see if there is there is a user in session
    if (req.session.user !== undefined && req.session.user !== null) {
        return next();
    }
    res.redirect('/');
};

// Retires the manga information and turns it into html and returns it
exports.mangaInfo = function(manga) {
    var title = '<h1>' + s.titleize(manga.title) + '</h1>';
    var photo = '<img class="thumbnail" src="' + manga.thumbnail + '"</img>';
    var author = '<span id="author"> <strong>Author:</strong> ' + s.titleize(manga.author) + '</span>';
    var status = '<span id="status"> <strong>Status:</strong> ' + s.humanize(manga.seriesStatus) + '</span>';
    var userStats = '<span id="userStats"> <strong>My Status:</strong> ' + s.humanize(manga.userStatus) + '</span>';
    var chapter = '<span id="chapter"> <strong>Current Chapter:</strong> <a href="' + manga.url + '" target="_blank">' + manga.chapter + '</a></span><br>';
    var type = '<span id="type"> <strong>Type:</strong> ' + s.humanize(manga.type) + '</span>';
    var direction = '<span id="direction"> <strong>Reading Direction:</strong> ' + s.titleize(manga.direction) + '</span>';
    var altName = '<span id="altName"> <strong>Other Names:</strong> ' + s.titleize(s.toSentence(manga.altName, ", ", ", ")) + '</span>';
    var categories = '<span id="categories"> <strong>Categories:</strong> ' + s.titleize(s.toSentence(manga.categories, ", ", ", ")) + '</span>';
    var plot = '<p id="plot"> <strong>Plot:</strong> ' + s.humanize(manga.plot) + '</p>';
    var html = '<div class="manga-panel tg-wrap"><table><tr><th colspan="3">' + title + '</th></tr><tr><td rowspan="4">' + photo + '</td><td>' + status + '</td><td>' + userStats + '</td></tr><tr><td>' + author + '</td><td>' + direction + '</td></tr><tr><td>' + chapter + '</td><td>' + type + '</td></tr><tr><td>' + categories + '</td><td>' + altName + '</td></tr><tr><td colspan="3">' + plot + '</td></tr></table></div>';
    return html;
};

// Sets complete manga object
exports.mangaObj = function(req) {
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
exports.userObj = function(req) {
    return {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
};

// Sets complete manga object
exports.jadeObj = function(sess) {
    return {
        title: sess.title,
        user: sess.user,
        url: sess.url,
        token: sess.token,
        api: sess.api
    };
};