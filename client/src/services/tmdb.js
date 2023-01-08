const getPopularMovies = async () => {
  const response = await fetch('http://localhost:3001/api/tmdb/popular');
  if (!response.ok) {
    const movies = await response.json();
    throw new Error(movies.status_message);
  }
  const movies = await response.json();
  return movies;
};

export default {
  getPopularMovies,
};
