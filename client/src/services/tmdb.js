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
const getMovieCredits = async movieId => {
  return await fetchData(`/api/tmdb/credits?movieId=${movieId}`);
};

export default {
  getPopularMovies,
  getByGenre,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
};
