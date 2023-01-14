const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const getToken = user => {
  const userForToken = {
    email: user.email,
    id: user._id ? user._id : user.id,
  };
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = getToken;
