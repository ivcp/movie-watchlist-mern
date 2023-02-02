import { useState } from 'react';
import { useQuery } from 'react-query';
import tmdbService from '../../../services/tmdb';

const useFetchMoviesByGenre = () => {
  const [genre, setGenre] = useState('all');
  const [page, setPage] = useState(1);
  let queryFn;
  if (genre === 'all') {
    queryFn = tmdbService.getPopularMovies.bind(null, page);
  } else {
    queryFn = tmdbService.getByGenre.bind(null, genre, page);
  }
  const {
    data: movies,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery(['movies', genre, page], queryFn, { keepPreviousData: true });

  return {
    setGenre,
    page,
    setPage,
    movies,
    isSuccess,
    isLoading,
    isError,
    error,
  };
};

export default useFetchMoviesByGenre;
