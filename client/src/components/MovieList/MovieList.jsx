import React, { useContext, useState } from 'react';
import MovieOnList from './MovieOnList';
import UserContext from '../../store/user-context';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import userService from '../../services/users';

const MovieList = () => {
  //TODO: error on refresh or navigate
  const ctx = useContext(UserContext);
  const [movies, setMovies] = useState(null);
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ['user', ctx.user?.id],
    userService.getUserDetails.bind(null, ctx.user?.id),
    {
      onSuccess: data => setMovies(data.movies),
      enabled: !!ctx.user,
    }
  );

  const showAll = () => {
    setMovies(data.movies);
  };
  const showWatched = () => {
    setMovies(data.movies.filter(movie => movie.watched));
  };
  const showUnwatched = () => {
    setMovies(data.movies.filter(movie => !movie.watched));
  };

  if (!ctx.user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div>
        <button onClick={showAll}>all</button>
        <button onClick={showWatched}>watched</button>
        <button onClick={showUnwatched}>unwatched</button>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess && data.movies.length === 0 && (
          <p>Add some movies to your list!</p>
        )}
        {isSuccess &&
          movies &&
          movies.map(movie => <MovieOnList key={movie.id} movie={movie} />)}
      </div>
    </>
  );
};

export default MovieList;
