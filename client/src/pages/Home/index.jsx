import React from 'react';
import GenreFilter from './components/GenreFilter';
import useFetchMoviesByGenre from './hooks/useFetchMoviesByGenre';
import Movie from './components/Movie';
import Pagination from './components/Pagination';
import Search from './components/Search';
import styles from './styles.module.css';

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
    <>
      <div className={styles.searchAndFilterContainer}>
        <Search />
        <GenreFilter setGenre={setGenre} setPage={setPage} />
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      <div className={styles.movies}>
        {isSuccess &&
          movies.results.length > 0 &&
          movies.results.map(movie => <Movie key={movie.id} movie={movie} />)}
      </div>
      {isSuccess && (
        <Pagination
          page={page}
          moviesPage={movies.page}
          totalPages={movies.totalPages}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default Movies;
