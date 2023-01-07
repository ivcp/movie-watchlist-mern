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
    user: user._id,
  });

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

moviesRouter.put('/:id', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;
  const { watched } = req.body;
  const user = req.user;
  const movie = await Movie.findById(id);

  if (movie.user._id.toString() === user._id.toString()) {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { watched },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedMovie);
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = moviesRouter;
