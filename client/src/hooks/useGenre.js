import { useState } from 'react';
import tmdbService from '../services/tmdb';

const useGenre = () => {
  const [genre, setGenre] = useState('all');
  const [page, setPage] = useState(1);
  let queryFn;
  if (genre === 'all') {
    queryFn = tmdbService.getPopularMovies.bind(null, page);
  } else {
    queryFn = tmdbService.getByGenre.bind(null, genre, page);
  }
  return { genre, queryFn, setGenre, page, setPage };
};

export default useGenre;
