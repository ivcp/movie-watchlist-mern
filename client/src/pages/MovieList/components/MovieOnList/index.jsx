import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import genres from '../../../../helpers/genres';
import Rating from '../Rating';
import Watched from '../Watched/index.jsx';
import PropTypes from 'prop-types';
import DeleteMovieBtn from '../../../../components/DeleteMovieBtn';
import styles from './styles.module.css';
import utils from '../../../../styles/utils.module.css';
import { TbChevronDown } from 'react-icons/tb';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import GenreTag from '../../../../components/GenreTag';

const MovieOnList = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 37.5em)');

  const expandDetails = () => {
    setShowDetails(prev => !prev);
  };
  return (
    <article className={styles.movieCard}>
      <div className={styles.titleContainer}>
        <h1>{movie.title}</h1>
        <div className={styles.ratingAndWatchedContainer}>
          {movie.watched && <Rating movie={movie} />}
          <Watched movie={movie} />
        </div>
        <button
          onClick={expandDetails}
          className={`${styles.expandButton} ${
            showDetails ? styles.rotate : ''
          }`}
          data-test="expand"
        >
          <TbChevronDown size={16} strokeWidth={2.5} />
          <span className={utils.srOnly}>expand</span>
        </button>
      </div>
      {showDetails && (
        <div className={styles.details} data-test="details-list">
          <div className={styles.genres}>
            {movie.genre_ids.map(genre => {
              const genreName = genres.reduce(
                (acc, cur) => (cur.id === genre ? acc + cur.name : acc),
                ''
              );
              return <GenreTag key={genre}>{genreName}</GenreTag>;
            })}
          </div>
          <div className={styles.overview}>{movie.overview}</div>
          <img
            className={styles.poster}
            loading={'lazy'}
            src={`https://image.tmdb.org/t/p/${isDesktop ? 'w154' : 'w92'}${
              movie.poster
            }`}
            alt={movie.title}
          />
          <div className={styles.options}>
            <Link to={`/movie/${movie.tmdbId}`}>more details</Link>
            <DeleteMovieBtn movie={movie} />
          </div>
        </div>
      )}
    </article>
  );
};

export default MovieOnList;

MovieOnList.propTypes = {
  movie: PropTypes.shape({
    tmdbId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre_ids: PropTypes.array.isRequired,
  }),
};
