const moviesRouter = require('express').Router();
const config = require('../utils/config');

moviesRouter.get('/', async (req, res) => {
  const response = await fetch(config.TMDB);
  const data = await response.json();
  res.send(data);
});

module.exports = moviesRouter;
