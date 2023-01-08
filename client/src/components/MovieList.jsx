import React from 'react';

const MovieList = ({ popularMovies }) => {
  return (
    <ul>
      {popularMovies.length > 0 &&
        popularMovies.map(movie => <li key={movie.id}>{movie.title}</li>)}
    </ul>
  );
};

export default MovieList;
