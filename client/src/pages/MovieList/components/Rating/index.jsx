import React, { useRef, useState } from 'react';
import useUpdateMovie from '../../hooks/useUpdateMovie';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import utils from '../../../../styles/utils.module.css';
import styles from './styles.module.css';

const Rating = ({ movie }) => {
  const updateMovie = useUpdateMovie(movie.id);
  const [showSelect, setShowSelect] = useState(false);
  const selectRef = useRef(null);
  const handleChange = e => {
    updateMovie({ rating: +e.target.value });
    setShowSelect(false);
  };
  const openRating = () => {
    setShowSelect(true);
  };
  return (
    <>
      <label htmlFor="rating" className={styles.label}>
        {movie.rating === null && <FaStar size={16} onClick={openRating} />}
        {Number.isFinite(movie.rating) && (
          <p className={styles.userRating} onClick={openRating}>
            {movie.rating}/10
          </p>
        )}
        <span>add rating</span>
      </label>
      <select
        className={`${styles.select} ${showSelect ? styles.visible : ''}`}
        name="rating"
        id="rating"
        defaultValue=""
        onChange={handleChange}
        ref={selectRef}
        onFocus={() => {
          selectRef.current.size = '11';
        }}
        onBlur={() => {
          setShowSelect(false);
        }}
      >
        <option value="" disabled hidden></option>
        {[...Array(11)].map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </>
  );
};

export default Rating;

Rating.propTypes = {
  movie: PropTypes.object.isRequired,
};
