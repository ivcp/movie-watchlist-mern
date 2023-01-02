const express = require('express');
const app = express();
//const cors = require('cors');
const moviesRouter = require('./controllers/movies');

//app.use(cors());

app.use('/api/movies', moviesRouter);

module.exports = app;
