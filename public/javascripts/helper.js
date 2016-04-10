'use strict';
/* Clear mangas from view
 * Removes manga from all views and lists.
 */
function cleanMangas() {
    $('.list').empty();
    $('.list2').empty();
    $('.list3').empty();
    $('.list4').empty();
}

/* Clear User Info from view
 * Removes user info from all views and lists.
 */
function cleanUser() {
    $('.user-name').empty();
    $('.user-email').empty();
    $('.user-count').empty();
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
        this.thumbnail = thumbnail;
}

/* Search Bar Functionality
 * Search for mangas on keypress.
 * Search by author, title, alt name, and categories.
 */

function search() {
    if ($('#search').val().length > 0) {
        $('.manga-panel').css('display', 'none');
        // Display the results
        displayResults();
    } else {
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
    var reg = new RegExp($('#search').val(), 'ig');
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
        $('#img').attr('src', img);
    } else {
        $('#img').attr('src', '../../images/kaneki1.jpg');
    }

    $('#img-input').unbind('keyup');
    $('#img-input').keyup(previewThumbnail);
}

$('#img-input').keyup(previewThumbnail);

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
    $.ajax(settings).done(function () {
        $(mangaClass).remove();
    });
}