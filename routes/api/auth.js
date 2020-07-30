const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Protected
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).res,json({msg: 'Server Error'});
    };
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post('/', [
    check('email', 'Valid email address is required').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // destructuring of req.body
    const {email, password} = req.body;

    try {
    // check for existing user
    let user = await User.findOne({email});

    if (!user) {
        // error response because you can't register the same user/email twice
        return res.status(400).json({errors: [{msg: 'Invalid login'}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({errors: [{msg: 'Invalid login'}]});
    }

    // returning jsonwebtoken
    // creating payload
    const payload = {
        user: {
            id: user.id
        }
    };

    // signing token, passing in all info
    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 3600000},
        (err, token) => {
            if(err) throw err;
            res.json({token})
    });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    };
});

module.exports = router;