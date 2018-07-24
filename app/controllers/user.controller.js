var User = require('mongoose').model('User');

exports.login = function (req, res) {
    console.log(req.body);

    req.checkBody('username', 'Invalid Username').notEmpty();
    req.checkBody('password', 'Invalid Password').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.render('index', {
            //'title': JSON.stringify(errors),
            'title': 'Invalid Username" or Password',
            'isLoggedIn': false
        });
        return;
    }

    req.session.remember = true;
    req.session.username = req.body.username;
    req.session.cookie.maxAge = 6000;

    res.render('index', {
        'title': 'Logged in as '+req.body.username,
        'isLoggedIn': true
    });
};

exports.logout = function (req, res) {
    req.session = null;
    res.render('index', {
        'title': 'See ya ~',
        'isLoggedIn': false
    });
};

exports.register = function (req, res, next) {
    if(typeof req.session.remember != 'undefined'){
        isLoggedIn = req.session.remember;
        res.render('exam', {
            'title': 'Exam'
        });
    }
    res.render('register', {
        'title': 'Register'
    });
};

exports.create = function (req, res, next) {
    var user = new User(req.body);

    user.save(function (err) {
        if(err){
            return next(err);
        }
        else{
            res.redirect('/');
        }
    });
};

exports.read = function (req, res, next) {
    User.find({}, 'username', function(err, users){
        if(err){
            return next(err);
        }
        else{
            res.json(users);
        }

    });
};

exports.readOne = function (req, res, next) {
    res.json(req.user);
};

exports.userByUsername = function (req, res, next, username) {
    User.findOne({
        username: username
    }, function (err, user) {
        if(err){
            return next(err);
        }
        else{
            req.user = user;
            next();
        }
    });
};

exports.editOne = function (req, res, next) {
    User.findOneAndUpdate({
        username: req.user.username
    }, req.body, function (err, user) {
        if(err){
            return next(err);
        }
        else{
            res.json(user);
        }
    });
};

exports.deleteOne = function (req, res, next) {
    req.user.remove(function (err, user) {
        if(err){
            return next(err);
        }
        else{
            res.json(req.user);
        }
    });
};