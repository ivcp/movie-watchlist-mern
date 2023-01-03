const tmdbRouter = require('express').Router();
const config = require('../utils/config');

tmdbRouter.get('/popular', async (req, res) => {
  const response = await fetch(
    `${config.TMDB}api_key=${config.API_KEY}&language=en-US&page=1`
  );
  if (!response.ok && response.status !== 500) {
    const error = await response.json();
    throw new Error(error.status_message);
  }
  if (res.status === 500) throw new Error(response.statusText);
  const { results } = await response.json();
  res.json(results);
});

tmdbRouter.get('/search', async (req, res) => {
  const { query } = req.body;

  const response = await fetch(
    `${config.SEARCH}api_key=${config.API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
  );
  if (!response.ok && response.status === 422) {
    const error = await response.json();
    //query not provided error msg
    throw new Error(error.errors[0]);
  }
  if (res.status === 500) throw new Error(response.statusText);
  const { results } = await response.json();
  res.json(results);
});

tmdbRouter.get('/details', async (req, res) => {
  const { movieId } = req.body;
  try {
    const response = await fetch(
      `${config.DETAILS}${movieId}?api_key=${config.API_KEY}&language=en-US`
    );
    if (!response.ok && response.status !== 500) {
      const error = await response.json();
      throw new Error(error.status_message);
    }
    if (res.status === 500) throw new Error(response.statusText);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

module.exports = tmdbRouter;
