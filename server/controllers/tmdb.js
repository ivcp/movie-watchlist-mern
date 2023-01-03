const tmdbRouter = require('express').Router();
const config = require('../utils/config');

tmdbRouter.get('/popular', async (req, res) => {
  try {
    const response = await fetch(config.TMDB);
    if (!response.ok) throw new Error(response.statusText);
    const { results } = await response.json();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

tmdbRouter.get('/search', async (req, res) => {
  const { query } = req.body;
  try {
    const response = await fetch(`${config.SEARCH}&query=${query}`);
    if (!response.ok) throw new Error(response.statusText);
    const { results } = await response.json();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

tmdbRouter.get('/details', async (req, res) => {
  const { movieId } = req.body;
  console.log(req.body);
  try {
    const response = await fetch(
      `${config.DETAILS}${movieId}?api_key=${config.API_KEY}&language=en-US`
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

module.exports = tmdbRouter;
