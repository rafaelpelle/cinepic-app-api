const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { getUser, createUser } = require('../controllers/users');

const router = express.Router();

router.get('/me', authMiddleware, getUser);
router.post('/register', createUser);

module.exports = router;
