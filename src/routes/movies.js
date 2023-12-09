const express = require('express');
const {
  searchMovies,
  getMovieById,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', authMiddleware, getMovieById);
router.get('/', authMiddleware, searchMovies);
router.post('/', authMiddleware, addMovie);
router.delete('/', authMiddleware, deleteMovie);

module.exports = router;
