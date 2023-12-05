const express = require('express');
const {
  getUser,
  getAllUsers,
  createUser,
  authenticateUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/register', createUser);
router.post('/login', authenticateUser);

module.exports = router;
