
const express = require('express');
const router = express.Router();
const checkAuthToken = require('../middlewares/auth')
const {login, register, profile} = require('../controllers/users/userController');


router.post('/register', register);
router.post('/login', login);
router.get('/profile', checkAuthToken, profile);

module.exports = router;
