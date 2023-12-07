const express = require('express');
const { searchMovies, getMovieById } = require('../controllers/movies');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/search', authMiddleware, searchMovies);
router.get('/:id', authMiddleware, getMovieById);

module.exports = router;
