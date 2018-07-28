var Exam = require('mongoose').model('Exam');
var User = require('mongoose').model('User');

exports.list = function (req, res) {
    if(req.user) {
        var score = findScore(req);
        Exam.find({}, function(err, exams){
            if(err){
                return next(err);
            }
            else{
                res.render('./exam/index', {
                    title: 'Exam',
                    user: req.user ? req.user : '',
                    score: score,
                    exams: exams,
                });
            }
        });
    }
    else{
        return res.redirect('/');
    }
};

exports.info = function(req, res){
    if(req.user) {
        var score = findScore(req);
        res.render('./exam/info', {
            title: 'Exam ' + req.exam.number,
            user: req.user ? req.user : '',
            score: score,
            exam: req.exam,
            error: false
        });
    }
    else{
        return res.redirect('/');
    }
};

exports.numberByExam = function (req, res, next, number) {
    Exam.findOne({
        number: number
    }, function (err, exam) {
        if(err){
            return next(err);
        }
        else{
            req.exam = exam;
            next();
        }
    });
};

exports.send = function (req, res){
    var exam = req.exam;
    var answer = req.body.answer;
    if(exam.answer == answer){
        var scores = [];
        var total = 0;
        for(var i=0; i<6; ++i){
            if(req.user.score[i] == 0 && i == req.exam.number - 1){
                scores[i] = req.exam.score;
                total += req.exam.score;
            }
            else {
                scores[i] = req.user.score[i];
                total += req.user.score[i];
            }
        }
        User.findOneAndUpdate({
            username: req.user.username
        }, {score: scores, total: total}, function (err, user) {
            if(err){
                return next(err);
            }
            else{
                return res.redirect('/exam');
            }
        });
    }
    else{
        var score = findScore(req);
        res.render('./exam/info', {
            title: 'Exam',
            user: req.user ? req.user : '',
            score: score,
            exam: exam,
            error: true
        });
    }

};

exports.read = function (req, res) {
    Exam.find({}, function(err, exams){
        if(err){
            return next(err);
        }
        else{
            res.json(exams);
        }
    });
};

exports.create = function (req, res, next) {
    var exam = new Exam(req.body);
    exam.save(function (err) {
        if(err){
            return next(err);
        }
        else{
            res.json(exam);
        }
    });
};

function findScore(req) {
    var score = 0;
    for(var i=0; i<6; ++i){
        score += req.user.score[i];
    }
    return score;
}