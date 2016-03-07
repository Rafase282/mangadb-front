'use strict';
/* GET forgotpassword page. */
exports.getForgot = function(req, res) {
    res.render('forgot', {
        title: 'MangaDB: Forgot Password',
        user: req.user,
        userurl: '/login'
    });
};

/* GET reset password page. */
exports.getReset = function(req, res) {
    res.render('reset', {
        title: 'MangaDB: Reset Password',
        user: req.user,
        userurl: '/login'
    });
};
