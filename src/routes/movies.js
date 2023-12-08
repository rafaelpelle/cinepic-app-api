const express = require('express');
const {
  searchMovies,
  getMovieById,
  addMovie,
} = require('../controllers/movies');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/search', authMiddleware, searchMovies);
router.get('/:id', authMiddleware, getMovieById);
router.post('/add', authMiddleware, addMovie);

module.exports = router;
