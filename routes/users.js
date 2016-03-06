var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user:user', function(req, res, next) {
    res.render('reset', {
        title: req.params.user,
        user: req.params.user,
        userurl: '/'
    });
});

module.exports = router;