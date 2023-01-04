const loginRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      error: 'user does not exist',
    });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid password',
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '1h' });

  res.status(200).json({ token, email: user.email, name: user.name });
});

module.exports = loginRouter;
