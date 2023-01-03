require('dotenv').config();

const TMDB = process.env.TMDB_URL;
const SEARCH = process.env.SEARCH_URL;
const DETAILS = process.env.DETAILS_URL;
const API_KEY = process.env.API_KEY;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = { TMDB, SEARCH, DETAILS, API_KEY, MONGODB_URI };
