const moviesRouter = require('express').Router();
const Movie = require('../models/movie');
const { userExtractor } = require('../utils/middleware');

moviesRouter.post('/', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Log in to add a movie' });
  }
  const body = req.body;
  const user = req.user;

  const movie = new Movie({
    tmdbId: body.tmdbId,
    title: body.title,
    poster: body.poster,
    overview: body.overview,
    genre_ids: body.genre_ids,
    user: user._id,
  });

  const movieInDb = await Movie.find({ tmdbId: body.tmdbId }).where({
    user: user._id,
  });
  if (movieInDb.length > 0) {
    return res.status(400).json({ error: 'movie already added to your list.' });
  }
  const savedMovie = await movie.save();
  user.movies = [...user.movies, savedMovie._id];
  await user.save();
  res.status(201).json(savedMovie);
});

moviesRouter.delete('/:id', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = req.user;
  const movie = await Movie.findById(req.params.id);

  if (movie.user._id.toString() === user._id.toString()) {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

moviesRouter.put('/:id/', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;
  const update = req.body;
  if (update['rating'] === undefined && update['watched'] === undefined) {
    return res.status(400).json({ error: 'Bad request. Failed to update' });
  }

  if (update['rating'] === undefined && update['watched'] === false) {
    update.rating = null;
  }

  const user = req.user;
  const movie = await Movie.findById(id);

  if (movie.user._id.toString() === user._id.toString()) {
    const updatedMovie = await Movie.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedMovie);
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = moviesRouter;
