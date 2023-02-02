import React, { useState, useContext } from 'react';
import UserContext from '../context/user-context';
import { useQuery } from 'react-query';
import movieService from '../services/movies';
import MovieOnList from '../pages/MovieList/components/MovieOnList';

const useMovieList = () => {
  const { user, setUser } = useContext(UserContext);
  const [sort, setSort] = useState('all');
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

  const sortedMovies = () => {
    if (sort === 'all') {
      return movieList.map(movieOnList);
    }
    if (sort === 'watched') {
      return movieList.filter(movie => movie.watched).map(movieOnList);
    }
    if (sort === 'unwatched') {
      return movieList.filter(movie => !movie.watched).map(movieOnList);
    }
  };

  return {
    user,
    setUser,
    sort,
    setSort,
    sortedMovies,
    movieList,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};

export default useMovieList;
