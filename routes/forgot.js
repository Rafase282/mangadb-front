var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/forgot', function(req, res, next) {
    res.render('reset', {
        title: 'MangaDB',
        user: 'MangaDB',
        userurl: '/'
    });
});

module.exports = router;