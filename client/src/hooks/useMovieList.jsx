import React, { useState, useContext } from 'react';
import UserContext from '../context/user-context';
import { useQuery } from 'react-query';
import movieService from '../services/movies';
import MovieOnList from '../components/MovieList/MovieOnList';

const useMovieList = () => {
  const { user } = useContext(UserContext);
  const [sort, setSort] = useState('all');
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ['movieList', user?.id],
    movieService.getUserMovieList.bind(null, user?.id),
    {
      enabled: !!user,
    }
  );

  const movieOnList = movie => <MovieOnList key={movie.id} movie={movie} />;

  const sortedMovies = () => {
    if (sort === 'all') {
      return data.map(movieOnList);
    }
    if (sort === 'watched') {
      return data.filter(movie => movie.watched).map(movieOnList);
    }
    if (sort === 'unwatched') {
      return data.filter(movie => !movie.watched).map(movieOnList);
    }
  };

  return {
    user,
    sort,
    setSort,
    sortedMovies,
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};

export default useMovieList;
