var request = require("request");
var funHelper = require('./helpers');
var s = require("underscore.string");
var sess;

/* GET home page. */
exports.getUserProfile = function(req, res) {
    sess=req.session;
    res.render('profile', {
        title: 'MangaDB: ' + sess.user,
        user: sess.user,
        userurl: '/user/' + sess.username
    });
};

exports.getToken = function getToken(req, res) {
    sess=req.session;
    var username = sess.username = req.body.username;
    var password = req.body.password;
    sess.user = s.titleize(username);
    var options = {
        method: 'POST',
        url: process.env.API + '/auth',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            username: username,
            password: password
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        body = JSON.parse(body);
        funHelper.setToken('token', body.token);
        funHelper.setToken('MangaReader', sess.user);
        res.redirect('/user/' + username);
    });
};