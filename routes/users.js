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