'use strict';
var sess;

/* GET forgotpassword page. */
exports.getForgot = function(req, res) {
    sess=req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Forgot Password';
    res.render('forgot', {
        title: sess.title,
        url: sess.url
    });
};

/* GET reset password page. */
exports.getReset = function(req, res) {
    sess=req.session;
    sess.url = '/';
    sess.user = null;
    sess.title = 'MangaDB: Reset Password';
    res.render('reset', {
        title: sess.title,
        url: sess.url
    });
};
