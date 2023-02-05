import React from 'react';
import useAddMovie from '../../../../hooks/useAddMovie';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMovieList from '../../../../hooks/useMovieList';
import styles from './styles.module.css';

const Movie = ({ movie, imageSize }) => {
  const addMovie = useAddMovie();
  const { movieList } = useMovieList();

  const movieIsOnList = movieList?.find(m => m.tmdbId === movie.id);

  return (
    <article className={styles.movieCard}>
      <button className={styles.button} onClick={() => addMovie(movie)}>
        {movieIsOnList ? 'in the list' : '+'}
      </button>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/${imageSize}/${movie.backdrop_path}`}
          alt={movie.title}
          loading="lazy"
          className={styles.img}
        />
        <h1 className={styles.title}>{movie.title}</h1>
      </Link>
    </article>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
