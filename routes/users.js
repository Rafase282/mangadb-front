/* This file handles all user interactions
 * from creating a new user to deleting it
 * and anythign in between.
 */

'use strict';
var request = require('request');
var funHelper = require('./helpers');
var sess;

/* Creates New User */
exports.createUser = function (req, res) {
    // If the passwords matches each other
    if (req.body.password === req.body.password2) {
        sess = req.session;
        sess.url = '/user/' + sess.username;
        sess.title = 'MangaDB: ' + sess.user;
        sess.api = process.env.API;
        var options = {
            method: 'POST',
            url: sess.api + '/users',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: funHelper.userObj(req.body)
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if (typeof body === 'string') {
                body = JSON.parse(body);
            }
            if (body.success === false) {
                funHelper.newUserMsg(req, res, body);
            } else {
                req.flash('success', body.message);
                res.redirect('/login');
            }
        });
    } else {
        req.flash('error', 'Your passwords don\'t match.');
        res.redirect('/signup');
    }
};

/* Handles User Update Request */
exports.updateUser = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'PUT',
        url: sess.api + '/users/' + sess.username,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        },
        form: funHelper.userObj(req.body)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        if (body.success === false) {
            funHelper.newUserMsg(req, res, body);
        } else {
            req.flash('success', body.message);
            res.redirect('/user/' + sess.username);
        }
    });
};

/* Handles User Deletion Request */
exports.deleteUser = function (req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'DELETE',
        url: sess.api + '/users/' + sess.username,
        headers: {
            'x-access-token': sess.token
        }
    };

    if (sess.username === req.params.user.toLowerCase() &&
        req.params.user.toLowerCase() === req.body.username.toLowerCase()) {
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
                res.redirect('/logout');
            }
        });
    } else {
        sess.error = 'You have input the wrong username, make sure you are' +
            ' deleting your own account and that you spelled it right!';
        res.redirect('/user/' + sess.username + '/delete');
    }
};