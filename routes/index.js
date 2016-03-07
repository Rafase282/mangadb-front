/* GET home page. */
exports.getHome = function(req, res) {
    res.render('index', {
        title: 'MangaDB',
        user: req.user,
        userurl: '/'
    });
};

/* GET login page. */
exports.getLogIn = function(req, res) {
    res.render('login', {
        title: 'MangaDB: Log In',
        user: req.user,
        userurl: '/'
    });
};

/* GET register page. */
exports.getSignUp = function(req, res) {
    res.render('signup', {
        title: 'MangaDB: Register',
        user: req.user,
        userurl: '/'
    });
};

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

/* GET home page after loggin out. */
exports.getLogOut = function(req, res) {
    res.render('index', {
        title: 'MangaDB',
        user: req.user,
        userurl: '/'
    });
};
