import React, { useRef, useState } from 'react';
import genres from '../../../../helpers/genres';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import utils from '../../../../styles/utils.module.css';
import emoji from 'react-easy-emoji';
import { TbArrowsLeftRight } from 'react-icons/tb';
import { TbChevronRight } from 'react-icons/tb';
import { TbChevronLeft } from 'react-icons/tb';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const GenreFilter = ({ setGenre, setPage }) => {
  const [selected, setSelected] = useState('all');
  const isDesktop = useMediaQuery('(min-width: 37.5em)');
  const sliderRef = useRef(null);
  const handleSelect = ({ target }) => {
    setSelected(target.id);
    setGenre(target.id);
    setPage(1);
  };

  return (
    <>
      {!isDesktop && (
        <div className={styles.genreTitle}>
          <h4>genre</h4>
          <TbArrowsLeftRight size={12} strokeWidth={1.5} />
        </div>
      )}
      <div className={styles.genrePicker}>
        {isDesktop && (
          <button
            className={styles.navButton}
            onClick={() => (sliderRef.current.scrollLeft -= 72)}
          >
            <TbChevronLeft size={20} strokeWidth={2} />
            <span className={utils.srOnly}>scroll left</span>
          </button>
        )}
        <div className={styles.genreContainer} ref={sliderRef}>
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
        {isDesktop && (
          <button
            className={styles.navButton}
            onClick={() => (sliderRef.current.scrollLeft += 72)}
          >
            <TbChevronRight size={20} strokeWidth={2} />
            <span className={utils.srOnly}>scroll right</span>
          </button>
        )}
      </div>
    </>
  );
};

export default GenreFilter;

GenreFilter.propTypes = {
  setGenre: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};
