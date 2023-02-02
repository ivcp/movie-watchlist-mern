import React from 'react';
import genres from '../../../../helpers/genres';
import PropTypes from 'prop-types';

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
            defaultChecked={genre.id === 'all'}
          />
          <label htmlFor={genre.id}>{genre.name}</label>
        </div>
      ))}
    </>
  );
};

export default GenreFilter;

GenreFilter.propTypes = {
  setGenre: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};
