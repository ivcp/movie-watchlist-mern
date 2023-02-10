import React, { useState, useContext } from 'react';
import UserContext from '../context/user-context';
import { useQuery } from 'react-query';
import movieService from '../services/movies';
import MovieOnList from '../pages/MovieList/components/MovieOnList';

const useMovieList = () => {
  const { user, setUser } = useContext(UserContext);
  const [filter, setFilter] = useState('all');
  const {
    data: movieList,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(
    ['movieList', user?.id],
    movieService.getUserMovieList.bind(null, user?.id),
    {
      enabled: !!user,
      staleTime: Infinity,
    }
  );

  const movieOnList = movie => <MovieOnList key={movie.id} movie={movie} />;

  const filteredMovies = () => {
    if (filter === 'all') {
      return movieList.map(movieOnList);
    }
    if (filter === 'watched') {
      return movieList.filter(movie => movie.watched).map(movieOnList);
    }
    if (filter === 'unwatched') {
      return movieList.filter(movie => !movie.watched).map(movieOnList);
    }
  };

  return {
    user,
    setUser,
    filter,
    setFilter,
    filteredMovies,
    movieList,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};

export default useMovieList;
