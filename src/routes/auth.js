const express = require('express');
const { authenticateUser } = require('../controllers/auth');

const router = express.Router();

router.post('/login', authenticateUser);

module.exports = router;
