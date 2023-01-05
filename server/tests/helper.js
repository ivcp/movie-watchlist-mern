const User = require('../models/user');
const Movie = require('../models/movie');

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};
const moviesInDb = async () => {
  const movies = await Movie.find({});
  return movies.map(u => u.toJSON());
};

module.exports = {
  usersInDb,
  moviesInDb,
};
