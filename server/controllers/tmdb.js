const tmdbRouter = require('express').Router();
const config = require('../utils/config');

tmdbRouter.get('/popular', async (req, res) => {
  const response = await fetch(
    `${config.POPULAR}api_key=${config.API_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
    const error = await response.json();
    return res.status(400).json(error);
  }
  const { results } = await response.json();
  res.json(results);
});

tmdbRouter.get('/search', async (req, res) => {
  const { query } = req.body;

  const response = await fetch(
    `${config.SEARCH}api_key=${config.API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
  );
  if (!response.ok) {
    const error = await response.json();
    return res.status(400).json(error);
  }
  const { results } = await response.json();
  res.json(results);
});

tmdbRouter.get('/details', async (req, res) => {
  const { movieId } = req.body;
  try {
    const response = await fetch(
      `${config.DETAILS}${movieId}?api_key=${config.API_KEY}&language=en-US`
    );
    if (!response.ok) {
      const error = await response.json();
      return res.status(400).json(error);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

module.exports = tmdbRouter;
