exports.render = function (req, res) {
    res.render('index', {
        'title': 'Index',
        'isLoggedIn': true
    });
};