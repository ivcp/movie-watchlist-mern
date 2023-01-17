const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('./config');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'TokenExpiredError') {
    return response
      .status(401)
      .json({ error: 'Token expired. Please log in again.' });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    request['user'] = user;
  }
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request['token'] = authorization.substring(7);
  }

  next();
};

module.exports = {
  errorHandler,
  userExtractor,
  tokenExtractor,
};
