import React from 'react';

const Movie = ({ movie }) => {
  return (
    <>
      <h4>{movie.title}</h4>
      <button>+</button>
    </>
  );
};

export default Movie;
