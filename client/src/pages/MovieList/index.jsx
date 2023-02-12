import React, { useEffect } from 'react';
import useMovieList from '../../hooks/useMovieList';
import FilterBtn from './components/FilterBtn';
import styles from './styles.module.css';

const MovieList = () => {
  const {
    user,
    movieList,
    filteredMovies,
    filter,
    setFilter,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMovieList();

  useEffect(() => {
    document.title = 'Watchlist';
  }, []);

  const allCount = movieList?.length;
  const watchedCount = movieList?.filter(movie => movie.watched).length;
  const unwatchedCount = movieList?.filter(movie => !movie.watched).length;

  if (!user) {
    return (
      <div className={styles.noUserMessage}>
        <p>Log in/Register to start adding movies to your list.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.sortButtons}>
        <FilterBtn
          filter={filter}
          count={allCount}
          setFilter={setFilter}
          text="all"
        />
        <FilterBtn
          filter={filter}
          count={watchedCount}
          setFilter={setFilter}
          text="watched"
        />
        <FilterBtn
          filter={filter}
          count={unwatchedCount}
          setFilter={setFilter}
          text="unwatched"
        />
      </div>
      <div className={styles.list}>
        {isLoading && <p className={styles.message}>Loading...</p>}
        {isError && <p className={styles.message}>{error.message}</p>}
        {isSuccess && movieList.length === 0 && (
          <p className={styles.message}>{`Add some movies to your list, ${
            user.name.split(' ')[0]
          }!`}</p>
        )}
        {isSuccess && movieList.length > 0 && filteredMovies()}
      </div>
    </div>
  );
};

export default MovieList;
