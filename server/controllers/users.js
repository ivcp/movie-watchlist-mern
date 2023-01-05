const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const allUsers = await User.find({}).populate('movies', {
    tmbdId: 1,
    title: 1,
    poster: 1,
    overview: 1,
    imdbLink: 1,
    watched: 1,
  });
  res.status(200).json(allUsers);
});

usersRouter.post('/', async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  if (!firstName || !lastName || !password || !email) {
    return res.status(400).json({
      error: 'name, password or email missing',
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
      error: 'user already exists',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name: `${firstName} ${lastName}`,
    email,
    passwordHash,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
