const express = require('express');
const {
  searchMovies,
  getMovieById,
  addMovie,
} = require('../controllers/movies');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', authMiddleware, getMovieById);
router.get('/', authMiddleware, searchMovies);
router.post('/', authMiddleware, addMovie);

module.exports = router;
