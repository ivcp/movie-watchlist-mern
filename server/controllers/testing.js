const testingRouter = require('express').Router();
const User = require('../models/user');
const Movie = require('../models/movie');

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({});
  await Movie.deleteMany({});
  response.status(204).end();
});

module.exports = testingRouter;
