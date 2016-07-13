/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "n" }]*/
/*exported cleanMangas mangaInfo cleanUser*/
/*global cleanMangas mangaInfo cleanUser token user api userMangas*/
'use strict';

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
  $.ajax(settings).done(function() {
    userMangas[mangaTitle].chapter = newChapter;
    $(mangaClass).text(newChapter); // updates chapter for all catagories
  });
}

/* Sends request to delete manga from DB and from the DOM itself */
function delManga(info) {
  var manga = info.split(','); // Split string into array
  var mangaClass = '.' + manga[0]; // Select the class
  var mangaTitle = manga[1];
  var confirm = confirm('Are you sure you want to delete?');
  if (confirm) {
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
  }

  $.ajax(settings).done(function() {
    $(mangaClass).remove();
  });
}
