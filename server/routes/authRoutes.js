const express = require('express');
const router = express.Router();
const {login_post}  = require('../controllers/authController');

router.post('/api/login', login_post);

module.exports = router;