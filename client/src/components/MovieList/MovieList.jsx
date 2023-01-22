import React from 'react';
import MovieOnList from './MovieOnList';
import { Navigate } from 'react-router-dom';
import useMovieList from '../../hooks/useMovieList';

const MovieList = () => {
  const {
    user,
    movies,
    setMovies,
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMovieList();

  const showAll = () => {
    setMovies(data);
  };
  const showWatched = () => {
    setMovies(data.filter(movie => movie.watched));
  };
  const showUnwatched = () => {
    setMovies(data.filter(movie => !movie.watched));
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div>
        <button onClick={showAll}>all({data?.length})</button>
        <button onClick={showWatched}>
          watched({data?.filter(movie => movie.watched).length})
        </button>
        <button onClick={showUnwatched}>
          unwatched({data?.filter(movie => !movie.watched).length})
        </button>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess && data.length === 0 && (
          <p>{`Add some movies to your list, ${user.name.split(' ')[0]}!`}</p>
        )}
        {isSuccess &&
          movies &&
          movies.map(movie => <MovieOnList key={movie.id} movie={movie} />)}
      </div>
    </>
  );
};

export default MovieList;
