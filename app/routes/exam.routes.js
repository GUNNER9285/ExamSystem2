module.exports = function (app) {
    var exam = require('../controllers/exam.controller');

    app.route('/exam')
        .get(exam.list);
    app.route('/exam/:number')
        .get(exam.info);
    app.route('/exam/send/:number')
        .post(exam.send);

    app.param('number', exam.numberByExam);

    app.route('/exam/create')
        .post(exam.create);
    app.route('/exam/read')
        .get(exam.read);

};