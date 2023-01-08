require('dotenv').config();

const PORT = process.env.PORT;
const POPULAR = process.env.POPULAR_URL;
const SEARCH = process.env.SEARCH_URL;
const DETAILS = process.env.DETAILS_URL;
const GENRE = process.env.GENRE_URL;
const API_KEY = process.env.API_KEY;
const SECRET = process.env.SECRET;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  PORT,
  POPULAR,
  SEARCH,
  DETAILS,
  GENRE,
  API_KEY,
  MONGODB_URI,
  SECRET,
};
