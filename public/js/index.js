function validateForm() {
  var username = document.forms["signUp"]["username"].value;
  var firstname = document.forms["signUp"]["firstname"].value;
  var lastname = document.forms["signUp"]["lastname"].value;
  var email = document.forms["signUp"]["email"].value;
  var password = document.forms["signUp"]["password"].value;
  var password2 = document.forms["signUp"]["password2"].value;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://mangadb-r282.herokuapp.com/api/users",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "username": username,
      "password": password,
      "email": email,
      "name": firstname,
      "lastname": lastname
    }
  };

  if (password === password2) {
    $.ajax(settings).done(function(response) {
      console.log(response);
    });
  } else {
    alert("No Matching password");
  }
}

function valLogin() {
  var username = username = document.forms["login"]["username"].value;
  var password = document.forms["login"]["password"].value;
  var userKey = window.btoa(username + ":" + password);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://mangadb-r282.herokuapp.com/api/mangas/" + username,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Authorization": "Basic " + userKey
    }
  };

  $.ajax(settings).done(function(data) {
    data.map(function(manga) {
      var title = '<div class="well manga"><h1>' + window.s.titleize(manga.title) + '</h1>';
      var photo = '<img class="thumbnail" src="http://www.readmanga.today/uploads/posters/the-god-of-high-school.jpg"</img>';
      var author = '<span id="author"> <strong>Author:</strong> ' + window.s.titleize(manga.author) + '</span><br>';
      var status = '<span id="status"> <strong>Status:</strong> ' + window.s.humanize(manga.seriesStatus) + '</span><br>';
      var userStats = '<span id="userStats"> <strong>My Status:</strong> ' + window.s.humanize(manga.userStatus) + '</span><br>';
      var chapter = '<span id="chapter"> <strong>Current Chapter:</strong> <a href="' + manga.url + '" target="_blank">' + manga.chapter + '</a></span><br>';
      var type = '<span id="type"> <strong>Type:</strong> ' + window.s.humanize(manga.type) + '</span><br>';
      var direction = '<span id="direction"> <strong>Reading Direction:</strong> ' + window.s.titleize(manga.direction) + '</span><br>';
      var altName = '<span id="altName"> <strong>Other Names:</strong> ' + window.s.titleize(window.s.toSentence(manga.altName, ", ", ", ")) + '</span><br>';
      var categories = '<span id="categories"> <strong>Categories:</strong> ' + window.s.titleize(window.s.toSentence(manga.categories, ", ", ", ")) + '</span><br>';
      var plot = '<p id="plot"> <strong>Plot:</strong> ' + window.s.humanize(manga.plot) + '</p><br>';
      var done = '</div>';
      var html = title + photo + status + userStats + author + chapter + type + direction + altName + categories + plot + done;
      $(".main").append(html);
    });
  });
}