const express = require('express');
const {
  authenticateUser,
  logoutUser,
  logoutUserAllTokens,
} = require('../controllers/auth');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', authenticateUser);
router.post('/logout', authMiddleware, logoutUser);
router.post('/logoutAll', authMiddleware, logoutUserAllTokens);

module.exports = router;
