/* This file handles all manga interactions
 * from creating a new manga to deleting it
 * and anythign in between.
 */

'use strict';
var funHelper = require('./helpers');
var sess;

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