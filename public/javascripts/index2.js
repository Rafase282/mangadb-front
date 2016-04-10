/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "clean || manga" }]*/
/*global userMangas */
'use strict';
var api = api;
var user = user;
var token = token;

/* Clear mangas from view Removes manga from all views and lists. */
function cleanMangas() {
    $('.list').empty();
    $('.list2').empty();
    $('.list3').empty();
    $('.list4').empty();
}

/* Clear User Info from view Removes user info from all views and lists. */
function cleanUser() {
    $('.user-name').empty();
    $('.user-email').empty();
    $('.user-count').empty();
}

/* Manga panels generator: Takes a manga object and creates custom html to be added to the dom. */
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

/* Search Bar Functionality: Search for mangas on keypress. Search by author, title, alt name, and categories. */
function search() {
    if ($('#search').val().length > 0) {
        $('.manga-panel').css('display', 'none');
        displayResults();
    } else {
        $('.manga-panel').css('display', 'block');
    }
    $('#search').unbind('keyup');
    $('#search').keyup(search);
}

/* Display Search Results, part of the search function.
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
/* Start Search when a key is released call the function. */
$('#search').keyup(search);

/* Live Thubnail Preview: When a key is release and the image input has text then use that text as the new src attribute for the image. */
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