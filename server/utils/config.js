require('dotenv').config();

const TMDB = process.env.TMDB_URL;
const SEARCH = process.env.SEARCH_URL;
const DETAILS = process.env.DETAILS_URL;
const API_KEY = process.env.API_KEY;

module.exports = { TMDB, SEARCH, DETAILS, API_KEY };
