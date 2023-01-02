const moviesRouter = require('express').Router();
const config = require('../utils/config');

moviesRouter.get('/', async (req, res) => {
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

moviesRouter.get('/search', async (req, res) => {
  try {
    const response = await fetch(`${config.SEARCH}&query=${req.body.query}`);
    if (!response.ok) throw new Error(response.statusText);
    const { results } = await response.json();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

module.exports = moviesRouter;
