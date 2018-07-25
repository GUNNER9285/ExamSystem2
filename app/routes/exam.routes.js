module.exports = function (app) {
    var exam = require('../controllers/exam.controller');

    app.route('/exam')
        .get(exam.list);

};