'use strict';
var userMangas = {};
var account = {};

/* Clear mangas from view
 * Removes manga from all views and lists.
 */
function clean() {
    $(".list").empty();
    $(".list2").empty();
    $(".list3").empty();
    $(".list4").empty();
}

/* Manga panels generator
 * Takes a manga object and creates custom html
 * to be added to the dom.
 */
function mangaInfo(manga) {
    var inputClass = 'input-' + window.s.slugify(manga.title);
    var panelClass = 'panel-' + window.s.slugify(manga.title);
    var dataChapter = [inputClass, manga.title];
    var dataDel = [panelClass, manga.title];

    var title = '<h1>' + window.s.titleize(manga.title) + '</h1>';

    var photo = '<img class="thumbnail" src="' + manga.thumbnail +
        '"</img>';

    var author = '<span id="author"> <strong>Author:</strong> ' +
        window.s.titleize(manga.author) + '</span>';

    var status = '<span id="status"> <strong>Status:</strong> ' +
        window.s.humanize(manga.seriesStatus) + '</span>';

    var userStats = '<span id="userStats"> <strong>My Status:</strong> ' +
        window.s.humanize(manga.userStatus) + '</span>';

    var chapter = '<span id="chapter"> <strong>Current Chapter: </strong>' +
        '<a class="' + inputClass + '" href="' +
        manga.url + '" target="_blank">' + manga.chapter + '</a></span><br>';

    var type = '<span id="type"> <strong>Type:</strong> ' +
        window.s.humanize(manga.type) + '</span>';

    var direction = '<span id="direction"><strong>Reading Direction:</strong>' +
        ' ' + window.s.titleize(manga.direction) + '</span>';

    var altName = '<span id="altName"> <strong>Other Names:</strong> ' +
        window.s.titleize(window.s.toSentence(manga.altName, ", ", ", ")) +
        '</span>';

    var categories = '<span id="categories"> <strong>Categories:</strong> ' +
        window.s.titleize(window.s.toSentence(manga.categories, ", ", ", ")) +
        '</span>';

    var plot = '<p id="plot"> <strong>Plot:</strong> ' +
        window.s.humanize(manga.plot) + '</p>';

    var addOne = '<button type="button" class="btn btn-default"' +
        ' onclick="oneUp(\'' + dataChapter + '\')">' +
        'Increase Chapter 1+</button>';

    var del = '<button type="button" class="btn btn-default"' +
        ' onclick="delManga(\'' + dataDel + '\')">Delete</button>';

    var upd = '<button type="button" class="btn btn-default" ' +
        'onclick="window.location=\'/user/' + user.toLowerCase() + '/' +
        encodeURIComponent(manga.title) + '\'">Update</button>';

    var buttons = '<div class="btn-group btn-group-justified" role="group"' +
        'aria-label="Controls"> <div class="btn-group" role="group">' +
        del + '</div> <div class="btn-group" role="group">' + addOne +
        '</div> <div class="btn-group" role="group">' + upd + '</div></div>';

    var html = '<div class="manga-panel ' + panelClass +
        ' tg-wrap"><table><tr><th colspan="3">' + title +
        '</th></tr><tr><td rowspan="4">' + photo + '</td><td>' + status +
        '</td><td>' + userStats + '</td></tr><tr><td>' + author +
        '</td><td>' + direction + '</td></tr><tr><td>' + chapter +
        '</td><td>' + type + '</td></tr><tr><td>' + categories +
        '</td><td>' + altName + '</td></tr><tr><td colspan="3">' + plot +
        '<br>' + buttons + '</td></tr></table></div>';

    return html;
}

/* Manga object constructor
 * Used to create a curated manga without saving
 * sensitive information like _id and user id.
 */
function createManga(title, author, url, userStatus, type, categories, chapter,
    seriesStatus, plot, altName, direction, thumbnail) {
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
        this.thumbnail = thumbnail
};

/* Get list of all user's mangas
 * Sends a GET request to the API and generates an oject
 * directory with curated manga information, sensitive data
 * is not kept.
 */

function getMangas() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user.toLowerCase(),
        "method": "GET",
        "headers": {
            "x-access-token": token
        }
    };

    $.ajax(settings).done(function (data) {
        clean();
        data.map(function (manga) {
            var newManga = new createManga(manga.title, manga.author, manga.url,
                manga.userStatus, manga.type, manga.categories, manga.chapter,
                manga.seriesStatus, manga.plot, manga.altName, manga.direction,
                manga.thumbnail);

            userMangas[manga.title] = newManga;
            var html = mangaInfo(newManga);

            if (newManga.userStatus === 'reading') {
                $(".list2").append(html);
            }
            else if (newManga.userStatus === 'finished') {
                $(".list3").append(html);
            }
            else if (newManga.userStatus === 'will read') {
                $(".list4").append(html);
            }
            $(".list").append(html);
        });
    });
};

// Get User Information
function getUserInfo() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "/users/" + user.toLowerCase(),
        "method": "GET",
        "headers": {
            "x-access-token": token
        }
    }

    $.ajax(settings).done(function (response) {
        account = {
            username: response.username,
            email: response.email,
            firstname: response.firstname,
            lastname: response.lastname
        };
        //console.log(account);
        var userName = '<h4>Full name: ' +
            window.s.titleize(response.firstname) + ' ' +
            window.s.titleize(response.lastname) + '</h4>';
        var userEmail = '<h4>E-Mail: ' + response.email + '</h4>';
        $(".user-name").append(userName);
        $(".user-email").append(userEmail);

    });
}
/* Load Manga info When Page Is Loaded
 * When the profile page is read it will
 * call the function to get all mangas.
 */
$(document).ready(function () {
    if (window.location.pathname == '/user/' + user.toLowerCase()) {
        getUserInfo();
        getMangas();
    };
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
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user.toLowerCase() + "/" +
            encodeURIComponent(mangaTitle),
        "method": "PUT",
        "headers": {
            "x-access-token": token,
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "chapter": newChapter
        }
    };

    $.ajax(settings).done(function (response) {
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
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user.toLowerCase() + "/" +
            encodeURIComponent(mangaTitle),
        "method": "DELETE",
        "headers": {
            "x-access-token": token,
            "content-type": "application/x-www-form-urlencoded"
        }
    }

    // When the DEL request is done, delete from DOM
    $.ajax(settings).done(function (response) {
        $(mangaClass).remove();
    });
}

/* Search Bar Functionality
 * Search for mangas on keypress.
 * Search by author, title, alt name, and categories.
 */

function search() {
    if ($('#search').val().length > 0) {
        var reg = new RegExp($('#search').val(), 'ig');
        $('.manga-panel').css('display', 'none');
        // Display the results
        displayResults()
    }
    else {
        // display everything again
        $('.manga-panel').css('display', 'block');
    }

    $('#search').unbind('keyup');
    $('#search').keyup(search);
}

/* Display Search Results
 * part of the search function.
 */
function displayResults() {
    for (var manga in userMangas) {
        if (reg.test(userMangas[manga].title) ||
            reg.test(userMangas[manga].altName) ||
            reg.test(userMangas[manga].categories) ||
            reg.test(userMangas[manga].author) ||
            reg.test(userMangas[manga].type)) {
            $('.panel-' + window.s.slugify(userMangas[manga].title))
                .css('display', 'block');
        }
    }
}
/* Start Search
 * When a key is released call the function.
 */

$('#search').keyup(search);

/* Live Thubnail Preview
 * When a key is release and the image input has text
 * then use that text as the new src attribute for the image.
 */
function previewThumbnail() {
    var img = $('#img-input').val();
    if ($('#img-input').val().length > 4) {
        $("#img").attr("src", img);
    }
    else {
        $("#img").attr("src", '../../images/kaneki1.jpg');
    }

    $('#img-input').unbind('keyup');
    $('#img-input').keyup(previewThumbnail);
}

$('#img-input').keyup(previewThumbnail);