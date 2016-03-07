var s = require("underscore.string");
// FORMS CODE

// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});


// REST OF CODE
var base_url = 'https://mangadb-r282.herokuapp.com';

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

// FORM FUNCTIONS

// Register new user.
function regUser() {
    var username = document.forms["signUp"]["username"].value;
    var firstname = document.forms["signUp"]["firstname"].value;
    var lastname = document.forms["signUp"]["lastname"].value;
    var email = document.forms["signUp"]["email"].value;
    var password = document.forms["signUp"]["password"].value;
    var password2 = document.forms["signUp"]["password2"].value;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": base_url + "/api/users",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "username": username,
            "password": password,
            "email": email,
            "firstname": firstname,
            "lastname": lastname
        }
    };

    if (password === password2) {
        $.ajax(settings).done(function(response) {
            alert('User has been created');
            console.log(response);
        });
    }
    else {
        alert("No Matching password");
    }
}

// Logs in the user
function logIn() {
    var username = document.forms["login"]["username"].value;
    var password = document.forms["login"]["password"].value;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": base_url + "/api/auth",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "username": username,
            "password": password
        }

    };

    $.ajax(settings).done(function(data) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('MangaReader', username);
        alert('Welcome back ' + username);
        console.log('Welcome back!');
    });
}

// Displays all mangas for current user.
function getManga() {
    var token = window.localStorage.getItem("token");
    var username = window.localStorage.getItem("MangaReader");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": base_url + "/api/mangas/" + username,
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
    var username = window.localStorage.getItem("MangaReader");
    var manga = encodeURI(document.getElementById('manga').value.toLowerCase());
    var prevManga = getPrevManga();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": base_url + "/api/mangas/" + username + "/" + manga,
        "method": "PUT",
        "headers": {
            "x-access-token": getToken(),
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
        "url": base_url + "/api/mangas/" + username + "/" + manga,
        "method": "GET",
        "headers": {
            "x-access-token": getToken()
        }
    };

    $.ajax(settings).done(function(manga) {
        window.localStorage.setItem('prevManga', JSON.stringify(manga));
        clean();
        var html = mangaInfo(manga);
        $(".mangas").append(html);
    });
}