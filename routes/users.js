var request = require("request");
var funHelper = require('./helpers');
var s = require("underscore.string");
var sess;

/* GET home page. */
exports.getUserProfile = function(req, res) {
    sess = req.session;
    sess.url = '/user/' + sess.username;
    sess.title = 'MangaDB: ' + sess.user;
    res.render('profile', {
        title: sess.title,
        user: sess.user,
        url: sess.url
    });
};

exports.getToken = function getToken(req, res) {
    sess = req.session;
    var username = req.body.username;
    var password = req.body.password;
    sess.user = s.titleize(username);
    sess.username = username;
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
        console.log(body);
        sess.token = JSON.parse(body).token;
        res.setHeader("x-access-token", sess.token);
        //funHelper.setToken('token', sess.token);
        //funHelper.setToken('MangaReader', sess.user);
        res.redirect('/user/' + username);
    });
};

exports.getMangas = function getMangas(req, res) {
    sess = req.session;
    var options = {
        method: 'GET',
        url: process.env.API + '/mangas/' + sess.user,
        headers: {
            'x-access-token': sess.token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        funHelper.clean();
        body.map(function(manga) {
            var html = funHelper.mangaInfo(manga);
            $(".mangas").append(html);
        });
    });

};