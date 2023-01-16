const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { userExtractor } = require('../utils/middleware');
const getToken = require('../utils/getToken');

usersRouter.get('/', async (req, res) => {
  const allUsers = await User.find({}).populate('movies', {
    tmbdId: 1,
    title: 1,
    poster: 1,
    overview: 1,
    watched: 1,
  });
  res.status(200).json(allUsers);
});

usersRouter.get('/:userId', userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = req.user;
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }

  if (user._id.toString() === req.params.userId) {
    const currentUser = await User.findById(req.params.userId).populate(
      'movies',
      {
        tmbdId: 1,
        title: 1,
        poster: 1,
        overview: 1,
        genre_ids: 1,
        watched: 1,
      }
    );
    // eslint-disable-next-line
    const { passwordHash, ...userDetails } = currentUser.toJSON();
    res.status(200).send(userDetails);
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

usersRouter.post('/', async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  if (!firstName || !password || !email) {
    return res.status(400).json({
      error: 'name, password or email missing',
    });
  }
  if (firstName.length > 12 || lastName.length > 12) {
    return res.status(400).json({
      error: 'name cannot be more than 12 characters long',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'password must be at least 6 characters long',
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      error: `email ${email} already taken`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name: lastName.trim() === '' ? firstName : `${firstName} ${lastName}`,
    email,
    passwordHash,
  });

  const savedUser = await newUser.save();
  const token = getToken(savedUser);

  res.status(201).json({ token, email: savedUser.email, name: savedUser.name });
});

module.exports = usersRouter;
