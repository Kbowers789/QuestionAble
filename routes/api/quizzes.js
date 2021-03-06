const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Quiz = require('../../models/Quiz');
const user = require('../../models/User');
const { check, validationResult } = require('express-validator');


// @route   GET api/quizzes/myQuizzes
// @desc    Get current user's quizzes
// @access  Private
router.get('/myQuizzes', auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find({owner: req.user.id}).populate('user', ['name', 'email', 'date']);
        if(quizzes.length === 0){
            return res.json({msg: 'user has no quizzes.'})
        }
        return res.json(quizzes)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/quizzes
// @desc    Create or update a quiz
// @access  Private
router.post('/', [auth, [
    check('name', 'name is required').not().isEmpty(),
    check('notify', 'notify is required').not().isEmpty(),
    check('randomize', 'randomize is required').not().isEmpty(),
    check('bank', 'bank is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, notify, randomize, bank, useFromBank} = req.body;

    // Building a quiz object
    const quizFields = {};

    quizFields.owner = req.user.id;
    if(name) quizFields.name = name;
    if(notify) quizFields.notify = notify;
    if(randomize) quizFields.randomize = randomize;
    if(bank) quizFields.bank = bank;
    if(useFromBank) quizFields.useFromBank = useFromBank;

    try {
        let thisQuiz = await Quiz.findOne({owner: req.user.id, name: name}).populate('user', ['name', 'email', 'date']);

        if (thisQuiz) {
            // Updating existing quiz
            thisQuiz = await Quiz.findOneAndUpdate({ owner: req.user.id, name: name}, { $set: quizFields}, {new: true});

            return res.json({msg: 'quiz successfully updated'})
        } else {
            // Creating a new quiz
            thisQuiz = new Quiz(quizFields);
            await thisQuiz.save();
            res.json(thisQuiz);    
        };

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;