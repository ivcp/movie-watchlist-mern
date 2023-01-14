const getPopularMovies = async page => {
  const response = await fetch(`/api/tmdb/popular?page=${page}`);
  if (!response.ok) {
    const movies = await response.json();
    throw new Error(movies.status_message);
  }
  return response.json();
};

const getByGenre = async (genreId, page) => {
  const response = await fetch(
    `/api/tmdb/genre?genreId=${genreId}&page=${page}`
  );
  if (!response.ok) {
    const movies = await response.json();
    throw new Error(movies.status_message);
  }
  return await response.json();
};

const searchMovies = async query => {
  const response = await fetch(`/api/tmdb/search?query=${query}`);
  if (!response.ok) {
    const results = await response.json();
    throw new Error(results.errors[0]);
  }
  const results = await response.json();
  return results;
};

export default {
  getPopularMovies,
  getByGenre,
  searchMovies,
};
