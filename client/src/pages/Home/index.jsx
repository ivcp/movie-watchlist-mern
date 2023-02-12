import React, { useEffect } from 'react';
import GenreFilter from './components/GenreFilter';
import useFetchMoviesByGenre from './hooks/useFetchMoviesByGenre';
import Movie from './components/Movie';
import Pagination from './components/Pagination';
import Search from './components/Search';
import styles from './styles.module.css';
import useMediaQuery from '../../hooks/useMediaQuery';

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

  const isDesktop = useMediaQuery('(min-width: 56.25em)');

  useEffect(() => {
    document.title = 'Watchlist';
  }, []);

  return (
    <>
      <div className={styles.searchAndFilterContainer}>
        <Search />
        <GenreFilter setGenre={setGenre} setPage={setPage} />
      </div>
      {isLoading && (
        <div className={styles.movies}>
          {[...Array(10)].map((_, i) => (
            <Movie key={i} skeleton movie={{}} />
          ))}
        </div>
      )}
      {isError && <p className={styles.message}>{error.message}</p>}
      <div className={styles.movies}>
        {isSuccess &&
          movies.results.length > 0 &&
          movies.results.map((movie, i) => (
            <Movie
              key={movie.id}
              movie={movie}
              imageSize={i === 0 && isDesktop ? 'w780' : 'w300'}
            />
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
    </>
  );
};

export default Movies;
