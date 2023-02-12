const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI } = require('./utils/config');
const cors = require('cors');
const tmdbRouter = require('./controllers/tmdb');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const moviesRouter = require('./controllers/movies');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to DB'))
  .catch(err => console.log(err));
app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/tmdb', tmdbRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}
app.use(middleware.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/login', middleware.userExtractor, loginRouter);
app.use('/api/movies', middleware.userExtractor, moviesRouter);
app.use(middleware.errorHandler);

module.exports = app;
