'use strict';
// HELPER FUNCTIONS
var s = require("underscore.string");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./storage');
}

// Retrieves the token from local storage and returns it.
exports.getToken = function getToken(name) {
    return localStorage.getItem(name);
};

// Stores token to local storage
exports.setToken = function setToken(name, info) {
    localStorage.setItem(name, info);
};

// Retrieves the token from local storage and returns it.
exports.getObj = function getObj(name) {
    return JSON.parse(localStorage.getItem(name));
};

// Removes manga from display
exports.clean = function clean() {
    $(".mangas").empty();
};

// Deletes the token from local storage and removes manga from display.
exports.logOut = function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("prevManga");
    //clean();
}



// Retires the manga information and turns it into html and returns it
exports.mangaInfo = function(manga) {
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
};