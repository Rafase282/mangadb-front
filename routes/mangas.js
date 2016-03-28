/* This file handles all manga interactions
 * from creating a new manga to deleting it
 * and anythign in between.
 */

'use strict';
var request = require('request');
var funHelper = require('./helpers');
var sess;

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
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        if (body.success === false) {
            funHelper.newUserMsg(req, res, body);
        } else {
            req.flash('success', body.message);
            res.redirect(sess.url);
        }
    });
};

/* Updates Manga */
exports.updateManga = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
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
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        if (body.success === false) {
            funHelper.newUserMsg(req, res, body);
        } else {
            req.flash('success', body.message);
            res.redirect(sess.url);
        }
    });

};