// Retrieves the token from local storage and returns it.
function getPrevManga() {
    return JSON.parse(window.localStorage.getItem("prevManga"));
}

// Removes manga from display
function clean() {
    $(".mangas").empty();
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
    var html = '<div class="manga-panel tg-wrap"><table><tr><th colspan="3">' + title + '</th></tr><tr><td rowspan="4">' + photo + '</td><td>' + status + '</td><td>' + userStats + '</td></tr><tr><td>' + author + '</td><td>' + direction + '</td></tr><tr><td>' + chapter + '</td><td>' + type + '</td></tr><tr><td>' + categories + '</td><td>' + altName + '</td></tr><tr><td colspan="3">' + plot + '</td></tr></table></div>';
    return html;


}

// FORM FUNCTIONS

// Displays all mangas for current user.
function getManga() {
    //var token = window.localStorage.getItem("token");
    //var username = window.localStorage.getItem("MangaReader");
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
            var html = mangaInfo(manga);
            $(".mangas").append(html);
        });
    });
}

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
            //"title": "Aiki",
            //"author": "Isutoshi",
            //"url": "http://www.readmanga.today/aiki",
            //"userStatus": "finished",
            //"type": "Japanese",
            //"categories": "Action, Ecchi, Martial Arts, Mature, Seinen",
            "chapter": prevManga.chapter + 1,
            //"seriesStatus": "Completed",
            //"plot": "There is fighting at the high school due to a power struggle for control. The granddaughter of the chief director requests help from the Aikido fighting style genius. Will he help? Or will he show his true colors with his bad boy ways?",
            //"altName": "Love Air",
            //"direction": "Right to Left",
            //"thumbnail": "http://www.readmanga.today/uploads/posters/aiki.jpg"
        }
    };

    $.ajax(settings).done(function(response) {
        clean();
        console.log(response);
        window.localStorage.setItem('prevManga', manga);
        findManga();
    });
}

// Finds manga by title
function findManga() {
    var username = window.localStorage.getItem("MangaReader");
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
        $(".mangas").append(html);
    });
}

// Create new Mana

function createManga() {
    var title;
    var author;
    var url;
    var userStatus;
    var type;
    var categories;
    var chapter;
    var seriesStatus;
    var plot;
    var altName;
    var direction;
    var thumbnail;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "/mangas/" + user,
        "method": "POST",
        "headers": {
            "x-access-token": token,
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "title": "The God of High School",
            "author": "PARK Yong Je",
            "url": "http://www.readmanga.today/the-god-of-high-school",
            "userStatus": "reading",
            "type": "Japanese",
            "categories": "Action, Adventure, Comedy, Martial Arts, Shounen",
            "chapter": "249",
            "seriesStatus": "Ongoing",
            "plot": "While an island half-disappearing from the face of the earth, a mysterious organization is sending out invitations for a tournament to every skilled fighter in the world. “If you win you can have ANYTHING you want”They’re recruiting only the best to fight the best and claim the title of The God of high school!",
            "altName": "God of Highschool, GoH",
            "direction": "Right to Left",
            "thumbnail": "http://www.readmanga.today/uploads/posters/the-god-of-high-school.jpg"
        }
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
    });
}