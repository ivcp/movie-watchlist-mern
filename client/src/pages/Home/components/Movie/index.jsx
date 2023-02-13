import React from 'react';
import useAddMovie from '../../../../hooks/useAddMovie';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMovieList from '../../../../hooks/useMovieList';
import styles from './styles.module.css';
import utils from '../../../../styles/utils.module.css';
import noImageFound from '../../../../assets/no-img.svg';
import { TbChecks } from 'react-icons/tb';

const Movie = ({ movie, imageSize, skeleton }) => {
  const addMovie = useAddMovie();
  const data = skeleton ? null : useMovieList();

  const movieIsOnList =
    !skeleton && data.movieList?.find(m => m.tmdbId === movie.id);
  const image =
    !skeleton && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/${imageSize}/${movie.backdrop_path}`
      : noImageFound;

  return (
    <article className={styles.movieCard}>
      {!skeleton ? (
        <button
          className={styles.button}
          onClick={() => addMovie(movie)}
          disabled={movieIsOnList}
        >
          {movieIsOnList ? (
            <TbChecks
              size={21}
              color={movieIsOnList.watched ? 'none' : '#CDD2D6'}
            />
          ) : (
            '+'
          )}
          <span className={utils.srOnly}>add movie</span>
        </button>
      ) : null}
      <Link to={skeleton ? '#' : `/movie/${movie.id}`}>
        {!skeleton ? (
          <img
            src={image}
            alt={movie.title}
            loading="lazy"
            className={styles.img}
          />
        ) : (
          <div className={styles.imgSkeleton} data-testid="loading-image"></div>
        )}
        {!skeleton ? <h1 className={styles.title}>{movie.title}</h1> : null}
      </Link>
    </article>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
