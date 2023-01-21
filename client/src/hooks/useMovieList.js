import { useState, useContext } from 'react';
import UserContext from '../store/user-context';
import { useQuery } from 'react-query';
import movieService from '../services/movies';

const useMovieList = () => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState(null);
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ['user', user?.id],
    movieService.getUser.bind(null, user?.id),
    {
      onSuccess: data => setMovies(data.movies),
      enabled: !!user,
    }
  );

  return {
    user,
    movies,
    setMovies,
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};

export default useMovieList;
