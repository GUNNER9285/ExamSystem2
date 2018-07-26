var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamSchema = new Schema({
    number: {
        type: Number,
        unique: true,
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
        trim: true,
    },
    score: {
        type: Number,
    },
});

mongoose.model('Exam', ExamSchema);