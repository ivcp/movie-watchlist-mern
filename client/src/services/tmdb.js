const getPopularMovies = async () => {
  const response = await fetch('http://localhost:3001/api/tmdb/popular');
  if (!response.ok) {
    const movies = await response.json();
    throw new Error(movies.status_message);
  }
  const movies = await response.json();
  return movies;
};
const searchMovies = async query => {
  const response = await fetch(
    `http://localhost:3001/api/tmdb/search?query=${query}`
  );
  if (!response.ok) {
    const results = await response.json();
    throw new Error(results.errors[0]);
  }
  const results = await response.json();
  return results;
};

export default {
  getPopularMovies,
  searchMovies,
};
