const express = require('express');
const router = express.Router();
const { register, login , getUserProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');


// @route   POST api/auth/register
// @desc    Register user
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', login);

router.get('/profile', auth, getUserProfile);

module.exports = router;
