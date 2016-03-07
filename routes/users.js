var s = require("underscore.string");

// HELPER FUNCTIONS

// Retrieves the token from local storage and returns it.
function getToken() {
    return window.localStorage.getItem("token");
}

// Retrieves the token from local storage and returns it.
function getPrevManga() {
    return JSON.parse(window.localStorage.getItem("prevManga"));
}

// Deletes the token from local storage and removes manga from display.
function logOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("prevManga");
    clean();
}

// Removes manga from display
function clean() {
    $(".mangas").empty();
}

// Retires the manga information and turns it into html and returns it
function mangaInfo(manga) {
    var title = '<h1>' + s.titleize(manga.title) + '</h1>';
    var photo = '<img class="thumbnail" src="' + manga.thumbnail + '"</img>';
    var author = '<span id="author"> <strong>Author:</strong> ' + s.titleize(manga.author) + '</span>';
    var status = '<span id="status"> <strong>Status:</strong> ' + s.humanize(manga.seriesStatus) + '</span>';
    var userStats = '<span id="userStats"> <strong>My Status:</strong> ' + s.humanize(manga.userStatus) + '</span>';
    var chapter = '<span id="chapter"> <strong>Current Chapter:</strong> <a href="' + manga.url + '" target="_blank">' + manga.chapter + '</a></span><br>';
    var type = '<span id="type"> <strong>Type:</strong> ' + s.humanize(manga.type) + '</span>';
    var direction = '<span id="direction"> <strong>Reading Direction:</strong> ' + s.titleize(manga.direction) + '</span>';
    var altName = '<span id="altName"> <strong>Other Names:</strong> ' + s.titleize(s.toSentence(manga.altName, ", ", ", ")) + '</span>';
    var categories = '<span id="categories"> <strong>Categories:</strong> ' + s.titleize(s.toSentence(manga.categories, ", ", ", ")) + '</span>';
    var plot = '<p id="plot"> <strong>Plot:</strong> ' + s.humanize(manga.plot) + '</p>';
    var html = '<div class="manga-panel tg-wrap"><table><tr><th colspan="3">' + title + '</th></tr><tr><td rowspan="4">' + photo + '</td><td>' + status + '</td><td>' + userStats + '</td></tr><tr><td>' + author + '</td><td>' + direction + '</td></tr><tr><td>' + chapter + '</td><td>' + type + '</td></tr><tr><td>' + categories + '</td><td>' + altName + '</td></tr><tr><td colspan="3">' + plot + '</td></tr></table></div>';
    return html;
}

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
        userurl: '/' + req.params.user
    });
};