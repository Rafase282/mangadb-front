/* This file handles all admin interactions
 * from batch user deletion to individual
 * user actions for any user.
 */

'use strict';
var request = require("request");
var sess;

/* UPDATE USER INFO */
exports.getUsersProfiles = function(req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'GET',
        url: sess.api + '/users',
        headers: {
            'x-access-token': sess.token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


};

/* DELETE USERS ACCOUNTS */
exports.deleteUsers = function(req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'DELETE',
        url: sess.api + '/users',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

};

/* DELETE USER ACCOUNT */
exports.deleteMangas = function(req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    sess.api = process.env.API;
    var options = {
        method: 'DELETE',
        url: sess.api + '/mangas',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-access-token': sess.token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

};