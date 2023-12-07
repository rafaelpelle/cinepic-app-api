const axios = require('axios');
const dotenv = require('dotenv');
const { errorResponse } = require('../utils/apiResponse');
const { searchRequired, idRequired } = require('../constants/errors');

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

module.exports = {
  searchMovies,
  getMovieById,
};
