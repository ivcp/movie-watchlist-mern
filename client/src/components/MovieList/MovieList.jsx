import React from 'react';
import { Navigate } from 'react-router-dom';
import useMovieList from '../../hooks/useMovieList';

const MovieList = () => {
  const {
    user,
    data,
    sortedMovies,
    sort,
    setSort,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMovieList();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const allCount = data?.length;
  const watchedCount = data?.filter(movie => movie.watched).length;
  const unwatchedCount = data?.filter(movie => !movie.watched).length;

  return (
    <>
      <div>
        <button
          style={{ fontWeight: sort === 'all' ? 'bold' : 'normal' }}
          onClick={() => setSort('all')}
        >
          all({allCount})
        </button>
        <button
          style={{ fontWeight: sort === 'watched' ? 'bold' : 'normal' }}
          onClick={() => setSort('watched')}
        >
          watched({watchedCount})
        </button>
        <button
          style={{ fontWeight: sort === 'unwatched' ? 'bold' : 'normal' }}
          onClick={() => setSort('unwatched')}
        >
          unwatched({unwatchedCount})
        </button>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess && data.length === 0 && (
          <p>{`Add some movies to your list, ${user.name.split(' ')[0]}!`}</p>
        )}
        {isSuccess && data.length > 0 && sortedMovies()}
      </div>
    </>
  );
};

export default MovieList;
