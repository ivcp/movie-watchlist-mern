import React from 'react';
import tmdbService from '../services/tmdb';

const Search = () => {
  const handleChange = async ({ target }) => {
    if (target.value.trim() === '') return;
    try {
      const result = await tmdbService.searchMovies(target.value.trim());
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  return <input type="text" onChange={handleChange} />;
};

export default Search;
