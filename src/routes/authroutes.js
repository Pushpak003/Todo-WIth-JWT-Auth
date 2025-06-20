const express = require('express');
const router = express.Router();
const {register, login} = require ('../controller/authcontroller');

// Register route
router.post('/register', register);
router.post('/login',login);

module.exports = router;