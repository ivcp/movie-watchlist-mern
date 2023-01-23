import React from 'react';
import useAddMovie from '../../hooks/useAddMovie';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Movie = ({ movie }) => {
  const addMovie = useAddMovie();

  return (
    <>
      <Link to={`/movie/${movie.id}`}>
        <div>
          <h4>{movie.title}</h4>
        </div>
      </Link>
      <button onClick={() => addMovie(movie)}>+</button>
    </>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
