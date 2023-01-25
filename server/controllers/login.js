const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const getToken = require('../utils/getToken');

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (email === '' || password === '') {
    return res.status(400).json({
      error: 'email and password required',
    });
  }

  if (!user) {
    return res.status(401).json({
      error: `user with email ${email} does not exist`,
    });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid password',
    });
  }

  const token = getToken(user);

  res.status(200).json({ token, id: user._id, name: user.name });
});

module.exports = loginRouter;
