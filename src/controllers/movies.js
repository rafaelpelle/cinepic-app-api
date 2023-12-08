const axios = require('axios');
const dotenv = require('dotenv');
const { errorResponse } = require('../utils/apiResponse');
const { searchRequired, idRequired } = require('../constants/errors');
const { Movie } = require('../model');

dotenv.config();

const { OMDB_API_URL, OMDB_API_KEY } = process.env;

async function searchMovies(req, res) {
  try {
    const { s, type } = req.query;

    if (!s) {
      throw new Error(searchRequired);
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
      throw new Error(idRequired);
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

    const updatedMovie = await Movie.findOneAndReplace(
      { imdbID: movie.imdbID },
      movie,
      { upsert: true, runValidators: true, new: true },
    );

    if (operation === 'bookmark') {
      await req.user.addToBookmarked(movie.imdbID);
    } else if (operation === 'alreadySeen') {
      await req.user.addToAlreadySeen(movie.imdbID);
    }

    res.status(200).send(updatedMovie);
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  searchMovies,
  getMovieById,
  addMovie,
};
