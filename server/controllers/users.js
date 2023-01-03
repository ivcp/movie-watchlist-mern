const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({});
  response.status(200).json(allUsers);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({
      error: 'username or password missing',
    });
  }

  if (password.length < 6) {
    return response.status(400).json({
      error: 'password must be at least 6 characters long',
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
