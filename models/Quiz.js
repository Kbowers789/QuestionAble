const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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

module.exports = Quiz = mongoose.model('quiz', QuizSchema);