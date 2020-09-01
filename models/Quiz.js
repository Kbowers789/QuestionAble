const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    notify: {
        type: Boolean, 
        required: true
    },
    randomize: {
        type: Boolean,
        required: true
    },
    bank: {
        type: Boolean,
        required: true
    },
    useFromBank: {
        type: Number,
    }
});

module.exports = User = mongoose.model('quiz', QuizSchema);