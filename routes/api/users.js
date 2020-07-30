const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

// @route   GET api/profile
// @desc    Test route
// @access  Public
/*router.get('/', (req, res) => {
    res.send('User route');
});*/

// @route POST api/users
// @desc Register User
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email address is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);
    res.send('User Reg route');
});

module.exports = router;