import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import genres from '../../../../helpers/genres';
import Rating from '../Rating';
import Watched from '../Watched/index.jsx';
import PropTypes from 'prop-types';
import DeleteMovieBtn from '../DeleteMovieBtn';

const MovieOnList = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);

  const expandDetails = () => {
    setShowDetails(prev => !prev);
  };
  return (
    <article>
      <h4>{movie.title}</h4>
      <div>
        {movie.watched && <Rating movie={movie} />}
        <Watched movie={movie} />
      </div>
      <button onClick={expandDetails}>expand</button>
      {showDetails && (
        <div>
          <div>
            {movie.genre_ids.map(genre => {
              const genreName = genres.reduce(
                (acc, cur) => (cur.id === genre ? acc + cur.name : acc),
                ''
              );
              return <p key={genre}>{genreName}</p>;
            })}
          </div>
          <div>{movie.overview}</div>
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.poster}`}
            alt={movie.title}
          />
          <div>
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