import { fetchData } from '../helpers/fetchData';

const getPopularMovies = async page => {
  return await fetchData(`/api/tmdb/popular?page=${page}`);
};

const getByGenre = async (genreId, page) => {
  return await fetchData(`/api/tmdb/genre?genreId=${genreId}&page=${page}`);
};

const searchMovies = async query => {
  return await fetchData(`/api/tmdb/search?query=${query}`);
};

const getMovieDetails = async movieId => {
  return await fetchData(`/api/tmdb/details?movieId=${movieId}`);
};

const getImdbRating = async imdbId => {
  return await fetchData(`https://search.imdbot.workers.dev/?tt=${imdbId}`);
};

export default {
  getPopularMovies,
  getByGenre,
  searchMovies,
  getMovieDetails,
  getImdbRating,
};
