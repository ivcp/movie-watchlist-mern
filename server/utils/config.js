require('dotenv').config();

const POPULAR = process.env.POPULAR_URL;
const SEARCH = process.env.SEARCH_URL;
const DETAILS = process.env.DETAILS_URL;
const API_KEY = process.env.API_KEY;
const SECRET = process.env.SECRET;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = { POPULAR, SEARCH, DETAILS, API_KEY, MONGODB_URI, SECRET };
