const tmdbRouter = require('express').Router();
const config = require('../utils/config');
const fetchMovies = require('../utils/fetchMovies');

tmdbRouter.get('/popular', async (req, res) => {
  fetchMovies(
    `${config.POPULAR}api_key=${config.API_KEY}&language=en-US&page=1`,
    res
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
  const details = true;

  fetchMovies(
    `${config.DETAILS}${movieId}?api_key=${config.API_KEY}&language=en-US`,
    res,
    details
  );
});

module.exports = tmdbRouter;
