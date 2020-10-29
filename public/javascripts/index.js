/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "Up || manga" }]*/
/*global cleanMangas mangaInfo cleanUser */
"use strict";
var userMangas = {};
var api = api;
var user = user;
var token = token;
var userObj = {};

/* Manga object constructor: Used to create a curated manga without saving 
sensitive information like and user id. */
function createManga(
  title,
  author,
  url,
  userStatus,
  type,
  categories,
  chapter,
  seriesStatus,
  plot,
  altName,
  direction,
  thumbnail,
  id
) {
  (this.title = title),
    (this.author = author),
    (this.url = url),
    (this.userStatus = userStatus),
    (this.type = type),
    (this.categories = categories),
    (this.chapter = chapter),
    (this.seriesStatus = seriesStatus),
    (this.plot = plot),
    (this.altName = altName),
    (this.direction = direction),
    (this.thumbnail = thumbnail),
    (this.id = id);
}

/* Get list of all user's mangas: Sends a GET request to the API and generates 
an oject directory with curated manga information, sensitive data is not kept.*/
function getMangas() {
  var settings = {
    async: true,
    crossDomain: true,
    url: api + "/mangas/" + user.toLowerCase(),
    method: "GET",
    headers: {
      "x-access-token": token
    }
  };
  $.ajax(settings).done(function(mangas) {
    cleanMangas();
    mangas.data.map(function(manga) {
      var newManga = new createManga(
        manga.title,
        manga.author,
        manga.url,
        manga.userStatus,
        manga.type,
        manga.categories,
        manga.chapter,
        manga.seriesStatus,
        manga.plot,
        manga.altName,
        manga.direction,
        manga.thumbnail,
        manga._id
      );
      userMangas[manga.title] = newManga;
      var html = mangaInfo(newManga);
      if (newManga.userStatus === "reading") {
        $(".list2").append(html);
      } else if (newManga.userStatus === "finished") {
        $(".list3").append(html);
      } else if (newManga.userStatus === "will read") {
        $(".list4").append(html);
      }
      $(".list").append(html);
    });
    $(".tooltipped").tooltip({
      delay: 50
    });
  });
}

// Get User Information
function getUserInfo() {
  var settings = {
    async: true,
    crossDomain: true,
    url: api + "/users/" + user.toLowerCase(),
    method: "GET",
    headers: {
      "x-access-token": token
    }
  };
  $.ajax(settings).done(function(response) {
    var userInfo = response.data[0];
    userObj.firstname = window.s.titleize(userInfo.firstname);
    userObj.lastname = window.s.titleize(userInfo.lastname);
    userObj.email = userInfo.email;
    userObj.count = Object.keys(userMangas).length;
    var userName =
      '<span class="center-align"><h5 class="black-text">' +
      "Full Name:</h5><h5> " +
      userObj.firstname +
      " " +
      userObj.lastname +
      "</h5></span>";
    var userEmail =
      '<span class="center-align"><h5 class="black-text">E-Mail:</h5><h5> ' +
      userInfo.email +
      "</h5></span>";
    var userCount =
      '<span class="center-align"><h5 class="black-text">' +
      "Total Manga Count:</h5><h5> " +
      userObj.count +
      "</h5></span>";
    cleanUser();
    $(".user-name").append(userName);
    $(".user-email").append(userEmail);
    $(".user-count").append(userCount);
  });
}
function waitForSideNav() {
  if (
    typeof $(".button-collapse").sideNav !== "undefined" &&
    $.isFunction($(".button-collapse").sideNav)
  ) {
    $(".button-collapse").sideNav();
  } else {
    setTimeout(this.waitForSideNav, 100);
  }
}

function waitForModal() {
  if (
    typeof $(".modal-trigger").modal !== "undefined" &&
    $.isFunction($(".modal-trigger").modal)
  ) {
    $(".modal").modal({
      dismissible: true, // Modal can be dismissed by clicking outside of it
      opacity: 0.5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      ready: getUserInfo // Callback for Modal open
    });
  } else {
    setTimeout(this.waitForModal, 100);
  }
}

/* Load Manga info When Page Is Loaded: When the profile page is read it will 
call the function to get all mangas. */
$(document).ready(function() {
  waitForSideNav();
  waitForModal();

  if (window.location.pathname === "/user/" + user.toLowerCase()) {
    getMangas();
  }
});
