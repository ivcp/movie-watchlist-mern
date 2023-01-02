require('dotenv').config();

const TMDB = process.env.TMDB_URL;
const SEARCH = process.env.SEARCH_URL;

module.exports = { TMDB, SEARCH };
