const moviesRouter = require('express').Router();
const Movie = require('../models/movie');

moviesRouter.get('/', async (req, res) => {
  const movies = await Movie.find({}).populate('user', { email: 1, name: 1 });
  res.json(movies);
});

module.exports = moviesRouter;
