import React from 'react';
import genres from '../helpers/genres';

const GenreFilter = ({ setGenre, setPage }) => {
  const handleSelect = ({ target }) => {
    setGenre(target.id);
    setPage(1);
  };

  return (
    <>
      {genres.map(genre => (
        <div key={genre.id} style={{ display: 'inline-block' }}>
          <input
            type="radio"
            id={genre.id}
            name="genre"
            onChange={handleSelect}
          />
          <label htmlFor={genre.id}>{genre.name}</label>
        </div>
      ))}
    </>
  );
};

export default GenreFilter;
