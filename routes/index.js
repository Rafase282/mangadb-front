var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'MangaDB',
        user: req.user,
        userurl: '/'
    });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'MangaDB: Log In',
        user: req.user,
        userurl: '/'
    });
});

/* GET register page. */
router.get('/signup', function(req, res, next) {
    res.render('signup', {
        title: 'MangaDB: Register',
        user: req.user,
        userurl: '/'
    });
});

/* GET forgotpassword page. */
router.get('/forgot', function(req, res, next) {
    res.render('forgot', {
        title: 'MangaDB: Forgot Password',
        user: req.user,
        userurl: '/login'
    });
});

/* GET reset password page. */
router.get('/reset', function(req, res, next) {
    res.render('reset', {
        title: 'MangaDB: Reset Password',
        user: req.user,
        userurl: '/login'
    });
});

/* GET home page after loggin out. */
router.get('/logout', function(req, res, next) {
    res.render('index', {
        title: 'MangaDB',
        user: req.user,
        userurl: '/'
    });
});

module.exports = router;
