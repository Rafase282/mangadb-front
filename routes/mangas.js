/* This file handles all manga interactions
 * from creating a new manga to deleting it
 * and anythign in between.
 */

"use strict";
var funHelper = require("./helpers");
var sess;

/* Creates New Manga */
exports.createManga = function(req, res) {
  sess = req.session;
  var options = {
    method: "POST",
    url: sess.api + "/mangas/" + sess.username,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-access-token": sess.token
    },
    form: funHelper.mangaObj(req.body)
  };
  funHelper.makeRequest(options, req, res, sess.url);
};

/* Updates Manga */
exports.updateManga = function(req, res) {
  sess = req.session;
  sess.url = "/user/" + sess.username;
  sess.title = "MangaDB: " + sess.user;
  sess.api = process.env.API;
  var options = {
    method: "PUT",
    url: sess.api + "/mangas/" + sess.username + "/title/" + req.params.manga,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-access-token": sess.token
    },
    form: funHelper.mangaObj(req.body)
  };
  funHelper.makeRequest(options, req, res, sess.url);
};

/* Prepares Request for deleting all mangas for a user */
var deleteMangas = function(session) {
  sess = session;
  sess.url = "/user/" + sess.username;
  sess.title = "MangaDB: " + sess.user;
  var options = {
    method: "DELETE",
    url: sess.api + "/mangas/" + sess.username,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-access-token": sess.token
    }
  };
  return options;
};
exports.deleteMangas = deleteMangas;

/* Deletes All User's Mangas */
exports.deleteUserMangas = function(req, res) {
  sess = req.session;
  if (
    sess.username === req.params.username.toLowerCase() &&
    req.params.username.toLowerCase() === req.body.username.toLowerCase()
  ) {
    var options = deleteMangas(sess);
    funHelper.makeRequest(options, req, res, sess.url);
  } else {
    sess.error =
      "You have input the wrong username, make sure you are" +
      " deleting your own mangas and that you spelled it right!";
    res.redirect("/user/" + sess.username + "/mangas/delete");
  }
};
