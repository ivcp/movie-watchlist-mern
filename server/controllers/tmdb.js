const tmdbRouter = require('express').Router();
const config = require('../utils/config');
const fetchMovies = require('../utils/fetchMovies');

tmdbRouter.get('/popular', async (req, res) => {
  const { page } = req.query;
  const currentPage = Math.round(page / 2);

  fetchMovies(
    `${config.POPULAR}api_key=${config.API_KEY}&language=en-US&page=${currentPage}`,
    res,
    page
  );
});

tmdbRouter.get('/genre', async (req, res) => {
  const { genreId, page } = req.query;
  const currentPage = Math.round(page / 2);

  fetchMovies(
    `${config.GENRE}api_key=${config.API_KEY}&with_genres=${genreId}&page=${currentPage}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`,
    res,
    page
  );
});

tmdbRouter.get('/search', async (req, res) => {
  const { query } = req.query;
  fetchMovies(
    `${config.SEARCH}api_key=${config.API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
    res
  );
});

tmdbRouter.get('/details', async (req, res) => {
  const { movieId } = req.query;

  fetchMovies(
    `${config.DETAILS}${movieId}?api_key=${config.API_KEY}&language=en-US`,
    res
  );
});

tmdbRouter.get('/credits', async (req, res) => {
  const { movieId } = req.query;
  fetchMovies(
    `${config.DETAILS}${movieId}/credits?api_key=${config.API_KEY}&language=en-US`,
    res
  );
});

module.exports = tmdbRouter;
