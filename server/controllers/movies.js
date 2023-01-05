const moviesRouter = require('express').Router();
const Movie = require('../models/movie');
const { userExtractor } = require('../utils/middleware');

moviesRouter.get('/', async (req, res) => {
  const movies = await Movie.find({}).populate('user', { email: 1, name: 1 });
  res.json(movies);
});

moviesRouter.post('/', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const body = req.body;
  const user = req.user;

  const movie = new Movie({
    tmbdId: body.tmbdId,
    title: body.title,
    poster: body.poster,
    overview: body.overview,
    imdbLink: body.imdbLink,
    user: user._id,
  });

  const savedMovie = await movie.save();
  user.movies = [...user.movies, savedMovie._id];
  await user.save();
  res.status(201).json(savedMovie);
});

module.exports = moviesRouter;
