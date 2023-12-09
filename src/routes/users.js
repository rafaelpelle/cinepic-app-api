const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getUser,
  createUser,
  getBookmarkedFromUser,
  getAlreadySeenFromUser,
  deleteMovieFromUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/me', authMiddleware, getUser);
router.post('/register', createUser);
router.get('/movies/bookmarked', authMiddleware, getBookmarkedFromUser);
router.get('/movies/alreadyseen', authMiddleware, getAlreadySeenFromUser);
router.delete('/movies', authMiddleware, deleteMovieFromUser);

module.exports = router;
