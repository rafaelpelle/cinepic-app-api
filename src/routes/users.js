const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getUser,
  createUser,
  authenticateUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/:id', authMiddleware, getUser);
router.post('/register', createUser);
router.post('/login', authenticateUser);

module.exports = router;
