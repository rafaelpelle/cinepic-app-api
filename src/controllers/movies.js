const axios = require('axios');
const dotenv = require('dotenv');
const { errorResponse } = require('../utils/apiResponse');
const {
  REQUIRED_SEARCH,
  REQUIRED_ID,
  REQUIRED_OPERATION,
  REQUIRED_IMDB_ID,
} = require('../constants/errors');
const { BOOKMARK, ALREADY_SEEN } = require('../constants/movieOps');
const { Movie } = require('../model');

dotenv.config();

const { OMDB_API_URL, OMDB_API_KEY } = process.env;

async function searchMovies(req, res) {
  try {
    const { s, type } = req.query;

    if (!s) {
      throw new Error(REQUIRED_SEARCH);
    }

    const { data } = await axios.get(
      `${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&s=${s}${
        type ? `&type=${type}` : ''
      }`,
    );

    res.send(data.Search);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function getMovieById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error(REQUIRED_ID);
    }

    const { data } = await axios.get(
      `${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&i=${id}`,
    );

    res.send(data);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function addMovie(req, res) {
  try {
    const { movie, operation } = req.body;

    if (operation !== BOOKMARK && operation !== ALREADY_SEEN) {
      throw new Error(REQUIRED_OPERATION);
    }

    const updatedMovie = await Movie.findOneAndReplace(
      { imdbID: movie.imdbID },
      movie,
      { upsert: true, runValidators: true, new: true },
    );

    if (operation === BOOKMARK) {
      await req.user.addToBookmarked(movie.imdbID);
    } else {
      await req.user.addToAlreadySeen(movie.imdbID);
    }

    res.status(200).send(updatedMovie);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function deleteMovie(req, res) {
  try {
    const { movie, operation } = req.body;

    if (!movie?.imdbID) {
      throw new Error(REQUIRED_IMDB_ID);
    }

    if (operation !== BOOKMARK && operation !== ALREADY_SEEN) {
      throw new Error(REQUIRED_OPERATION);
    }

    if (operation === BOOKMARK) {
      await req.user.removeFromBookmarked(movie.imdbID);
    } else {
      await req.user.removeFromAlreadySeen(movie.imdbID);
    }

    res.status(204).send();
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  searchMovies,
  getMovieById,
  addMovie,
  deleteMovie,
};
