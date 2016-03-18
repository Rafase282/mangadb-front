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
    res.render('createManga', funHelper.jadeObj(sess));
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
        form: funHelper.mangaObj(req)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
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
    res.render('updateManga', funHelper.jadeObj(sess));
};

/* Updates Manga */
exports.updateManga = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'PUT',
        url: sess.api + '/mangas/' + sess.username + '/' + req.body.title,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        },
        form: funHelper.mangaObj(req)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

};