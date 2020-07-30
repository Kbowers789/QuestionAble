const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

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
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // destructuring of req.body
    const {name, email, password} = req.body;

    try {
    // check for existing user
    let user = await User.findOne({email});

    if (user) {
        // error response because you can't register the same user/email twice
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    // creating an instance, but NOT saving to db yet
    user = new User({
        name,
        email,
        password
    });

    // encryption of password with bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // saving user to db
    await user.save();

    // returning jsonwebtoken
    
    console.log(req.body);
    res.send('User Registered');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    };
});

module.exports = router;