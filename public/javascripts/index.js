'use strict';
var userMangas = {};
var api = api;
var user = user;
var token = token;
var userObj = {};

/* Manga panels generator
 * Takes a manga object and creates custom html
 * to be added to the dom.
 */
function mangaInfo(manga) {
    var inputClass = 'input-' + window.s.slugify(manga.title);
    var panelClass = 'panel-' + window.s.slugify(manga.title);
    var dataChapter = [inputClass, manga.title];
    var dataDel = [panelClass, manga.title];

    var title = window.s.titleize(manga.title);

    var photo = '<img class="activator thumbnail" src="' + manga.thumbnail + '"</img>';

    var author = '<span id="author"> <strong class="black-text">Author:</strong> ' + window.s.titleize(manga.author) + '</span><br/>';

    var status = '<span id="status"> <strong class="black-text">Series Status:</strong> ' + window.s.humanize(manga.seriesStatus) + '</span>&nbsp;&nbsp;';

    var userStats = '<span id="userStats"> <strong class="black-text">My Status:</strong> ' + window.s.humanize(manga.userStatus) + '</span>';

    var chapter = '<span class="float-right"> <strong class="black-text">Current Chapter: </strong>' + '<a class="' + inputClass + '" href="' + manga.url + '" target="_blank">' + manga.chapter + '</a></span>&nbsp;&nbsp;&nbsp;';

    var type = '<span id="type"> <strong class="black-text">Type:</strong> ' + window.s.humanize(manga.type) + '</span><br>';

    var direction = '<span id="direction"><strong class="black-text">Reading Direction:</strong>' + ' ' + window.s.titleize(manga.direction) + '</span><br/>';

    var altName = '<span id="altName"> <strong class="black-text">Other Names:</strong> ' + window.s.titleize(window.s.toSentence(manga.altName, ', ', ', ')) + '</span><br/><br/>';

    var categories = '<span id="categories"> <strong class="black-text">Categories:</strong> ' + window.s.titleize(window.s.toSentence(manga.categories, ', ', ', ')) + '</span>';

    var plot = '<p id="plot"> <strong class="black-text">Plot:</strong> ' + window.s.humanize(manga.plot) + '</p><br/><br/>';

    var addOne = '<a class="btn tooltipped blue darken-1" data-position="bottom" data-delay="50" data-tooltip="Increase Chapter Number by One" onclick="oneUp(\'' + dataChapter + '\')">' + '<i class="material-icons">plus_one</i></a>';

    var del = '<a class="btn tooltipped blue darken-1" data-position="bottom" data-delay="50" data-tooltip="Delete Manga" onclick="delManga(\'' + dataDel + '\')"><i class="material-icons">delete</i></a>';

    var upd = '<a class="btn tooltipped blue darken-1" data-position="bottom" data-delay="50" data-tooltip="Update Manga Information" href=\'/user/' + user.toLowerCase() + '/' + encodeURIComponent(manga.title) + '\'"><i class="material-icons">update</i></a>';

    var buttons = '<div class="row center-align">' + '<div class="input-field.col.s12.m6">' + del + addOne + upd + '</div></div>';

    var html = '<div class="col s12 m6 manga-panel ' + panelClass + '"><div class="card large" style="overflow: hidden;"><div class="card-image waves-effect waves-block waves-light blue darken-1 hoverable">' + photo + '</div><div class="card-content"> <span class="card-title activator grey-text text-darken-4">' + title + '<i class="material-icons right">more_vert</i></span> <br>' + chapter + direction + '</div><div class="card-action">' + buttons + '</div><div class="card-reveal" style="display: none; transform:' + ' translateY(0px);"><span class="card-title grey-text text-darken-4">' + title + '<br/><br/><i class="material-icons right">close</i></span> ' + altName + author + status + userStats + type + categories + plot + '</div></div></div>';

    return html;
}

/* Get list of all user's mangas
 * Sends a GET request to the API and generates an oject
 * directory with curated manga information, sensitive data
 * is not kept.
 */

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

    $.ajax(settings).done(function(mangas) {
        cleanMangas();
        mangas.data.map(function(manga) {
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

    $.ajax(settings).done(function(response) {
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
/* Load Manga info When Page Is Loaded
 * When the profile page is read it will
 * call the function to get all mangas.
 */
$(document).ready(function() {
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

/* Increment chapter number
 * Sends a PUT to the API with the new chapter number.
 */
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

    $.ajax(settings).done(function() {
        // Update chapter number in place
        userMangas[mangaTitle].chapter = newChapter;
        $(mangaClass).text(newChapter); // updates chapter for all catagories
    });
}

/* Sends request to delete manga from DB
 * and from the DOM itself
 */

function delManga(info) {
    // Sends delete request and removes the manga from the DOM
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

    // When the DEL request is done, delete from DOM
    $.ajax(settings).done(function() {
        $(mangaClass).remove();
    });
}