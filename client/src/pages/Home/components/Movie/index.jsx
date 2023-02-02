import React from 'react';
import useAddMovie from '../../../../hooks/useAddMovie';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMovieList from '../../../../hooks/useMovieList';

const Movie = ({ movie }) => {
  const addMovie = useAddMovie();
  const { movieList } = useMovieList();

  const movieIsOnList = movieList?.find(m => m.tmdbId === movie.id);

  return (
    <>
      <Link to={`/movie/${movie.id}`}>
        <div>
          <h4>{movie.title}</h4>
        </div>
      </Link>
      <button onClick={() => addMovie(movie)}>
        {movieIsOnList ? 'in the list' : '+'}
      </button>
    </>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
