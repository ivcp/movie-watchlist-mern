import React, { useState } from 'react';
import genres from '../../../../helpers/genres';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import utils from '../../../../styles/utils.module.css';
import emoji from 'react-easy-emoji';

const GenreFilter = ({ setGenre, setPage }) => {
  const [selected, setSelected] = useState('all');
  const handleSelect = ({ target }) => {
    setSelected(target.id);
    setGenre(target.id);
    setPage(1);
  };

  return (
    <div className={styles.genreContainer}>
      {genres.map(genre => (
        <div key={genre.id} className={styles.genre}>
          <input
            type="radio"
            id={genre.id}
            name="genre"
            onChange={handleSelect}
            defaultChecked={genre.id === selected}
            className={utils.srOnly}
          />
          <label htmlFor={genre.id}>
            <div
              className={`${styles.emoji} ${
                selected === genre.id.toString() ? 'selectedGenre' : ''
              }`}
            >
              {emoji(genre.emoji)}
            </div>
            <span>{genre.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default GenreFilter;

GenreFilter.propTypes = {
  setGenre: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};
