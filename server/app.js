const express = require('express');
const app = express();
const morgan = require('morgan');

//const cors = require('cors');
const tbdmRouter = require('./controllers/tmdb');

//app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/tmdb', tbdmRouter);

module.exports = app;
