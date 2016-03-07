var request = require("request");
var funHelper = require('./helpers');

/* GET home page. */
exports.getUserProfile = function(req, res) {
    /*
    var request = require("request");
    var token = window.localStorage.getItem("token");
    var username = window.localStorage.getItem("MangaReader");

    var options = {
        method: 'GET',
        url: process.env.URL + '/api/mangas/' + username,
        headers: {
            'x-access-token': token
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        clean();
        body.map(function(manga) {
            var html = mangaInfo(manga);
            $(".mangas").append(html);
        });
    });
    */
    res.render('profile', {
        title: req.params.user,
        user: req.params.user,
        userurl: '/user/' + req.params.user
    });
};

exports.getToken = function getToken(req, res) {
    var username = req.username;
    var password = req.password;
    var options = {
        method: 'POST',
        url: process.env.URL + '/auth',
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
        funHelper.setToken('token', body.token);
        funHelper.setToken('MangaReader', username);
        alert('Welcome back ' + username);
        console.log('Welcome back!');
    });
};