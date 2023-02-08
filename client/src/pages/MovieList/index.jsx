import React from 'react';
import useMovieList from '../../hooks/useMovieList';
import SortBtn from './components/SortBtn';
import styles from './styles.module.css';

const MovieList = () => {
  const {
    user,
    movieList,
    sortedMovies,
    sort,
    setSort,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMovieList();

  const allCount = movieList?.length;
  const watchedCount = movieList?.filter(movie => movie.watched).length;
  const unwatchedCount = movieList?.filter(movie => !movie.watched).length;

  return (
    <div className={styles.container}>
      <div className={styles.sortButtons}>
        <SortBtn sort={sort} count={allCount} setSort={setSort} text="all" />
        <SortBtn
          sort={sort}
          count={watchedCount}
          setSort={setSort}
          text="watched"
        />
        <SortBtn
          sort={sort}
          count={unwatchedCount}
          setSort={setSort}
          text="unwatched"
        />
      </div>
      <div>
        {!user && <p>Log in to start adding movies to your list</p>}
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {isSuccess && movieList.length === 0 && (
          <p>{`Add some movies to your list, ${user.name.split(' ')[0]}!`}</p>
        )}
        {isSuccess && movieList.length > 0 && sortedMovies()}
      </div>
    </div>
  );
};

export default MovieList;
