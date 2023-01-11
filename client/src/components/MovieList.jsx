import React, { useState } from 'react';
import { useQuery } from 'react-query';
import tmdbService from '../services/tmdb';
import GenreFilter from './GenreFilter';

const MovieList = () => {
  const [genre, setGenre] = useState('all');
  let queryFn;
  if (genre === 'all') {
    queryFn = tmdbService.getPopularMovies;
  } else {
    queryFn = tmdbService.getByGenre.bind(null, genre);
  }

  const { data: movies, isSuccess } = useQuery(['movies', genre], queryFn);

  return (
    <>
      <GenreFilter setGenre={setGenre} />
      <ul>
        {isSuccess &&
          movies.length > 0 &&
          movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
      </ul>
    </>
  );
};

export default MovieList;
