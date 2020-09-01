const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz'
    },
    text: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

module.exports = Question = mongoose.model('question', QuestionSchema);