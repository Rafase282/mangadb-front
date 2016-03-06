var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'MangaDB',
        user: 'MangaDB',
        userurl: '/'
    });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('forms', {
        title: 'MangaDB: Log In',
        user: 'MangaDB',
        userurl: '/'
    });
});

/* GET register page. */
router.get('/signup', function(req, res, next) {
    res.render('forms', {
        title: 'MangaDB: Register',
        user: 'MangaDB',
        userurl: '/'
    });
});

/* GET reset password page. */
router.get('/forgot', function(req, res, next) {
    res.render('forms', {
        title: 'MangaDB: Reset Password',
        user: 'MangaDB',
        userurl: '/login'
    });
});

module.exports = router;
