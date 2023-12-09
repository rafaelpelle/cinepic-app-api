const { User, Movie } = require('../model');
const { errorResponse } = require('../utils/apiResponse');
const { parseCompactMovie } = require('../utils/parser');
const { REQUIRED_OPERATION, REQUIRED_IMDB_ID } = require('../constants/errors');
const { BOOKMARK, ALREADY_SEEN } = require('../constants/movieOps');

async function getUser(req, res) {
  res.send(req.user);
}

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function getMovieFromUser(req, res, key) {
  try {
    const idList = req.user[key].map(({ imdbID }) => imdbID);
    const movies = await Movie.find({
      imdbID: { $in: idList },
    });
    res.status(200).send(movies.map(parseCompactMovie));
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function getBookmarkedFromUser(req, res) {
  getMovieFromUser(req, res, 'bookmarked');
}

async function getAlreadySeenFromUser(req, res) {
  getMovieFromUser(req, res, 'alreadySeen');
}

async function deleteMovieFromUser(req, res) {
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
  getUser,
  createUser,
  getBookmarkedFromUser,
  getAlreadySeenFromUser,
  deleteMovieFromUser,
};
