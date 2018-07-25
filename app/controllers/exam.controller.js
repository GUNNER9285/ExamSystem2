//var User = require('mongoose').model('User');

exports.list = function (req, res) {
    res.render('exam', {
        title: 'Exam',
        user: req.user ? req.user : ''
    });
};
