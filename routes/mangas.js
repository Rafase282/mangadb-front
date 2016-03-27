/* This file handles all manga interactions
 * from creating a new manga to deleting it
 * and anythign in between.
 */

'use strict';
var request = require("request");
var funHelper = require('./helpers');
var sess;

/* New Manga Handling
 * The following code handles displaying and API call method
 * for manga creation form.
 */

/* Displays Manga Creation Form */
exports.getCreateManga = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    sess.button = 'Create Manga';
    sess.header = 'Create New Manga';
    res.render('editManga', funHelper.jadeObj(sess, req));
};

/* Creates New Manga */
exports.createManga = function (req, res) {
    sess = req.session;
    var options = {
        method: 'POST',
        url: sess.api + '/mangas/' + sess.username,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        },
        form: funHelper.mangaObj(req.body)
    };
    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }
        if (!body.success) {
            funHelper.newUserMsg(req, res, body)
        } else {
            req.flash('success', body.message);
            res.redirect(sess.url);
        }
    });
};

/* Update Manga Handling
 * The following code handles displaying and API call method
 * for manga update form.
 */

/* Displays Manga Update Form */
exports.getUpdateManga = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    sess.button = 'Update Manga';
    sess.header = 'Update Manga Information';
    res.render('editManga', funHelper.jadeObj(sess, req));
};

/* Updates Manga */
exports.updateManga = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var msg = 'The manga has been updated.';
    var options = {
        method: 'PUT',
        url: sess.api + '/mangas/' + sess.username + '/' + req.params.manga,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        },
        form: funHelper.mangaObj(req.body)
    };

    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }
        if (!body.success) {
            funHelper.newUserMsg(req, res, body)
        } else {
            req.flash('success', body.message);
            res.redirect(sess.url);
        }
    });

};