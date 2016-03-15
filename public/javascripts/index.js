var mangaArray = {};

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

    var title = '<h1>' + window.s.titleize(manga.title) + '</h1>';

    var photo = '<img class="thumbnail" src="' + manga.thumbnail +
        '"</img>';

    var author = '<span id="author"> <strong>Author:</strong> ' +
        window.s.titleize(manga.author) + '</span>';

    var status = '<span id="status"> <strong>Status:</strong> ' +
        window.s.humanize(manga.seriesStatus) + '</span>';

    var userStats = '<span id="userStats"> <strong>My Status:</strong> ' +
        window.s.humanize(manga.userStatus) + '</span>';

    var chapter = '<span id="chapter"> <strong>Current Chapter:</strong>' +
        '<a class="C' + window.s.slugify(manga.title) + '" href="' +
        manga.url + '" target="_blank">' + manga.chapter + '</a></span><br>';

    var type = '<span id="type"> <strong>Type:</strong> ' +
        window.s.humanize(manga.type) + '</span>';

    var direction = '<span id="direction"><strong>Reading Direction:</strong> '
        + window.s.titleize(manga.direction) + '</span>';

    var altName = '<span id="altName"> <strong>Other Names:</strong> ' +
        window.s.titleize(window.s.toSentence(manga.altName, ", ", ", ")) +
        '</span>';

    var categories = '<span id="categories"> <strong>Categories:</strong> ' +
        window.s.titleize(window.s.toSentence(manga.categories, ", ", ", ")) +
        '</span>';

    var plot = '<p id="plot"> <strong>Plot:</strong> ' +
        window.s.humanize(manga.plot) + '</p>';

    var addOne = '<input type="submit" class="' + inputClass +
        '" data-title="' + manga.title + '" data-chapter="' + manga.chapter +
        '" value="Chapter 1+" onclick="oneUp()"/>';

    var del = '<input type="submit" value="Delete Manga"' +
        ' onclick="window.location.href="/delete""/>';

    var update = '<input type="submit" value="Update Manga"' +
        ' onclick="window.location.href="/update""/>';

    var html = '<div class="manga-panel ' + panelClass +
        ' tg-wrap"><table><tr><th colspan="3">' + title +
        '</th></tr><tr><td rowspan="4">' + photo + '</td><td>' + status +
        '</td><td>' + userStats + '</td></tr><tr><td>' + author +
        '</td><td>' + direction + '</td></tr><tr><td>' + chapter +
        '</td><td>' + type + '</td></tr><tr><td>' + categories +
        '</td><td>' + altName + '</td></tr><tr><td colspan="3">' + plot +
        '<br>' + addOne + del + update + '</td></tr></table></div>';

    return html;
}

/* Manga object constructor
 * Used to create a curated manga without saving
 * sensitive information like _id and user id.
 */
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
        "url": api + "/mangas/" + user,
        "method": "GET",
        "headers": {
            "x-access-token": token
        }
    };

    $.ajax(settings).done(function(data) {
        clean();
        data.map(function(manga) {
            var newManga = new createManga(manga.title, manga.author, manga.url, manga.userStatus, manga.type, manga.categories, manga.chapter, manga.seriesStatus, manga.plot, manga.altName, manga.direction, manga.thumbnail);

            mangaArray[manga.title] = newManga;
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

$(document).ready(getMangas);

/* Increment chapter number
 * Sends a PUT to the API with the new chapter number.
 */
function oneUp() {
    var inputClass = 'input-' + window.s.slugify(manga.dataset.title);
    var manga = document.getElementsByClassName(inputClass);
    var newChapter = +manga.dataset.chapter + 1;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user.toLowerCase() + "/" + encodeURIComponent(manga.dataset.title),
        "method": "PUT",
        "headers": {
            "x-access-token": token,
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "chapter": newChapter
        }
    };

    $.ajax(settings).done(function(response) {
        // Update chapter number in place
        mangaArray[manga.dataset.title].chapter = newChapter;
        var classTitle = '.' + inputClass;
        $(classTitle).text(mangaArray[manga.dataset.title].chapter);
    });
}

/* Search bar
 * Search for mangas on keypress.
 */
function search() {
    if ($('#search').val().length > 0) {
        var reg = new RegExp($('#search').val(), 'ig');
        $('.manga-panel').css('display', 'none');

        for (var manga in mangaArray) {
            if (reg.test(mangaArray[manga].title)) {
                $('.panel-' + window.s.slugify(mangaArray[manga].title))
                    .css('display', 'block');
            }
        }
    }
    else if ($('#search').val().length < 1) {
        // display everything again
        $('.manga-panel').css('display', 'block');
    }

    $('#search').unbind('keyup');
    $('#search').keyup(function() {
        search();
    });
}

$('#search').keyup(function() {
    search();
});