const express = require('express');
const app = express();
const morgan = require('morgan');

//const cors = require('cors');
const moviesRouter = require('./controllers/movies');

//app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/movies', moviesRouter);

module.exports = app;
