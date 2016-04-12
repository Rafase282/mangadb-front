/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "Up || manga" }]*/
/*global cleanMangas mangaInfo cleanUser */
'use strict';
var userMangas = {};
var api = api;
var user = user;
var token = token;
var userObj = {};

/* Manga object constructor: Used to create a curated manga without saving sensitive information like _id and user id. */
function createManga(title, author, url, userStatus, type, categories, chapter, seriesStatus, plot, altName, direction, thumbnail) {
    this.title = title,
    this.author = author,
    this.url = url,
    this.userStatus = userStatus,
    this.type = type,
    this.categories = categories,
    this.chapter = chapter,
    this.seriesStatus = seriesStatus,
    this.plot = plot,
    this.altName = altName,
    this.direction = direction,
    this.thumbnail = thumbnail;
}

/* Get list of all user's mangas: Sends a GET request to the API and generates an oject directory with curated manga information, sensitive data is not kept. */
function getMangas() {
    var settings = {
        'async': true,
        'crossDomain': true,
        'url': api + '/mangas/' + user.toLowerCase(),
        'method': 'GET',
        'headers': {
            'x-access-token': token
        }
    };
    $.ajax(settings).done(function (mangas) {
        cleanMangas();
        mangas.data.map(function (manga) {
            var newManga = new createManga(manga.title, manga.author, manga.url,
                manga.userStatus, manga.type, manga.categories, manga.chapter,
                manga.seriesStatus, manga.plot, manga.altName, manga.direction,
                manga.thumbnail);
            userMangas[manga.title] = newManga;
            var html = mangaInfo(newManga);
            if (newManga.userStatus === 'reading') {
                $('.list2').append(html);
            } else if (newManga.userStatus === 'finished') {
                $('.list3').append(html);
            } else if (newManga.userStatus === 'will read') {
                $('.list4').append(html);
            }
            $('.list').append(html);
        });
        $('.tooltipped').tooltip({
            delay: 50
        });
    });
}

// Get User Information
function getUserInfo() {
    var settings = {
        'async': true,
        'crossDomain': true,
        'url': api + '/users/' + user.toLowerCase(),
        'method': 'GET',
        'headers': {
            'x-access-token': token
        }
    };
    $.ajax(settings).done(function (response) {
        var userInfo = response.data[0];
        userObj.firstname = window.s.titleize(userInfo.firstname);
        userObj.lastname = window.s.titleize(userInfo.lastname);
        userObj.email = userInfo.email;
        userObj.count = Object.keys(userMangas).length;
        var userName = '<span class="center-align"><h5 class="black-text">' + 'Full Name:</h5><h5> ' + userObj.firstname + ' ' + userObj.lastname + '</h5></span>';
        var userEmail = '<span class="center-align"><h5 class="black-text">E-Mail:</h5><h5> ' + userInfo.email + '</h5></span>';
        var userCount = '<span class="center-align"><h5 class="black-text">' + 'Total Manga Count:</h5><h5> ' + userObj.count + '</h5></span>';
        cleanUser();
        $('.user-name').append(userName);
        $('.user-email').append(userEmail);
        $('.user-count').append(userCount);
    });
}
/* Load Manga info When Page Is Loaded: When the profile page is read it will call the function to get all mangas. */
$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of it
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        ready: getUserInfo, // Callback for Modal open
        out_duration: 200 // Transition out duration
    });
    if (window.location.pathname === '/user/' + user.toLowerCase()) {
        getMangas();
    }
});

/* Increment chapter number: Sends a PUT to the API with the new chapter number. */
function oneUp(info) {
    var manga = info.split(','); // Split string into array
    var mangaClass = '.' + manga[0]; // Select the class
    var mangaTitle = manga[1];
    var currentChapter = +$(mangaClass + ':first').text(); // Get value as int
    var newChapter = currentChapter + 1; // increment chapter
    var settings = {
        'async': true,
        'crossDomain': true,
        'url': api + '/mangas/' + user.toLowerCase() + '/' +
            encodeURIComponent(mangaTitle),
        'method': 'PUT',
        'headers': {
            'x-access-token': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        'data': {
            'chapter': newChapter
        }
    };
    $.ajax(settings).done(function () {
        userMangas[mangaTitle].chapter = newChapter;
        $(mangaClass).text(newChapter); // updates chapter for all catagories
    });
}

/* Sends request to delete manga from DB and from the DOM itself */
function delManga(info) {
    var manga = info.split(','); // Split string into array
    var mangaClass = '.' + manga[0]; // Select the class
    var mangaTitle = manga[1];
    var settings = {
        'async': true,
        'crossDomain': true,
        'url': api + '/mangas/' + user.toLowerCase() + '/' +
            encodeURIComponent(mangaTitle),
        'method': 'DELETE',
        'headers': {
            'x-access-token': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    };
    $.ajax(settings).done(function () {
        $(mangaClass).remove();
    });
}