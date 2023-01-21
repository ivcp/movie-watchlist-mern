import React from 'react';
import useAddMovie from '../../hooks/useAddMovie';

const Movie = ({ movie }) => {
  const addMovie = useAddMovie();

  return (
    <>
      <h4>{movie.title}</h4>
      <button onClick={() => addMovie(movie)}>+</button>
    </>
  );
};

export default Movie;
