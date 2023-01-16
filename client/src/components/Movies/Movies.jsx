import React from 'react';
import GenreFilter from './GenreFilter';
import useFetchMoviesByGenre from '../../hooks/useFetchMoviesByGenre';
import Movie from './Movie';
import Pagination from './Pagination';
import MovieCard from '../UI/MovieCard';

const Movies = () => {
  const {
    movies,
    isSuccess,
    isLoading,
    isError,
    error,
    page,
    setGenre,
    setPage,
  } = useFetchMoviesByGenre();

  return (
    <div>
      <GenreFilter setGenre={setGenre} setPage={setPage} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      <div>
        {isSuccess &&
          movies.results.length > 0 &&
          movies.results.map(movie => (
            <MovieCard key={movie.id}>
              <Movie movie={movie} />
            </MovieCard>
          ))}
      </div>
      {isSuccess && (
        <Pagination
          page={page}
          moviesPage={movies.page}
          totalPages={movies.totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Movies;
