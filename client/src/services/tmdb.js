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

export default {
  getPopularMovies,
  getByGenre,
  searchMovies,
};
