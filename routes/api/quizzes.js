const express = require('express');
const router = express.Router();

// @route   GET api/quizzes
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send('Quiz route');
});

module.exports = router;