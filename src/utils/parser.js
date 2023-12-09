function parseCompactMovie(movie) {
  return {
    imdbID: movie.imdbID,
    title: movie.title,
    year: movie.year,
    actors: movie.actors,
    poster: movie.poster,
  };
}

module.exports = {
  parseCompactMovie,
};
