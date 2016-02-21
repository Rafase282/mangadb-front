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
    },
    success: function(data) {
      console.log(data);
    }
  };

  $.ajax(settings);
}