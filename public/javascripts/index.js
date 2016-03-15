var mangaArray = [];
// Retrieves the token from local storage and returns it.
function getPrevManga() {
    return JSON.parse(window.localStorage.getItem("prevManga"));
}

// Removes manga from display
function clean() {
    $(".list").empty();
}

// Retires the manga information and turns it into html and returns it
function mangaInfo(manga) {
    var title = '<h1>' + window.s.titleize(manga.title) + '</h1>';
    var photo = '<img class="thumbnail" src="' + manga.thumbnail + '"</img>';
    var author = '<span id="author"> <strong>Author:</strong> ' + window.s.titleize(manga.author) + '</span>';
    var status = '<span id="status"> <strong>Status:</strong> ' + window.s.humanize(manga.seriesStatus) + '</span>';
    var userStats = '<span id="userStats"> <strong>My Status:</strong> ' + window.s.humanize(manga.userStatus) + '</span>';
    var chapter = '<span id="chapter"> <strong>Current Chapter:</strong> <a href="' + manga.url + '" target="_blank">' + manga.chapter + '</a></span><br>';
    var type = '<span id="type"> <strong>Type:</strong> ' + window.s.humanize(manga.type) + '</span>';
    var direction = '<span id="direction"> <strong>Reading Direction:</strong> ' + window.s.titleize(manga.direction) + '</span>';
    var altName = '<span id="altName"> <strong>Other Names:</strong> ' + window.s.titleize(window.s.toSentence(manga.altName, ", ", ", ")) + '</span>';
    var categories = '<span id="categories"> <strong>Categories:</strong> ' + window.s.titleize(window.s.toSentence(manga.categories, ", ", ", ")) + '</span>';
    var plot = '<p id="plot"> <strong>Plot:</strong> ' + window.s.humanize(manga.plot) + '</p>';
    var html = '<div class="manga-panel ' + window.s.slugify(manga.title) + ' tg-wrap"><table><tr><th colspan="3">' + title + '</th></tr><tr><td rowspan="4">' + photo + '</td><td>' + status + '</td><td>' + userStats + '</td></tr><tr><td>' + author + '</td><td>' + direction + '</td></tr><tr><td>' + chapter + '</td><td>' + type + '</td></tr><tr><td>' + categories + '</td><td>' + altName + '</td></tr><tr><td colspan="3">' + plot + '</td></tr></table></div>';
    return html;

}

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

// FORM FUNCTIONS

// Displays all mangas for current user.
$(document).ready(function() {
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
            var newManga = new createManga(manga.title, manga.author, manga.url, manga.userStatus, manga.type, manga.categories, manga.chapter, manga.seriesStatus, manga.plot, manga.altName, manga.direction, manga.thumbnail)
            mangaArray.push(newManga);
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
});

// Updates manga, currenlty increase manga chapter by one.
function oneUp() {
    var manga = encodeURI(document.getElementById('manga').value.toLowerCase());
    var prevManga = getPrevManga();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user + "/" + manga,
        "method": "PUT",
        "headers": {
            "x-access-token": token,
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "chapter": prevManga.chapter + 1
        }
    };

    $.ajax(settings).done(function(response) {
        clean();
        window.localStorage.setItem('prevManga', manga);
        findManga();
    });
}

// Finds manga by title
function findManga() {
    var manga = encodeURI(document.getElementById('manga').value.toLowerCase());
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user + "/" + manga,
        "method": "GET",
        "headers": {
            "x-access-token": token
        }
    };

    $.ajax(settings).done(function(manga) {
        window.localStorage.setItem('prevManga', JSON.stringify(manga));
        clean();
        var html = mangaInfo(manga);
        $(".list").append(html);
    });
}

// CODE FOR THE SEARCH BAR
function search() {
    if ($('#search').val().length > 0) {
        // Display matching names by hiding anything that is not what we want from the  class= "user"
        var reg = new RegExp($('#search').val(), 'ig');
        $('.manga-panel').css('display', 'none');

        for (var manga in mangaArray) {
            if (reg.test(mangaArray[manga].title)) {
                $('.' + window.s.slugify(mangaArray[manga].title)).css('display', 'block');
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