import React, { useRef, useState } from 'react';
import useUpdateMovie from '../../hooks/useUpdateMovie';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
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
    selectRef.current.size = '11';
    selectRef.current.focus();
  };
  return (
    <>
      <label
        htmlFor={movie.title}
        className={styles.label}
        onClick={openRating}
        data-test="rating"
      >
        {movie.rating === null && <FaStar size={16} />}
        {Number.isFinite(movie.rating) && (
          <p className={styles.userRating}>{movie.rating}/10</p>
        )}
        <span>{movie.rating ? 'change ' : 'add '}rating</span>
      </label>
      <select
        className={`${styles.select} ${showSelect ? styles.visible : ''}`}
        name="rating"
        id={movie.title}
        defaultValue=""
        onChange={handleChange}
        ref={selectRef}
        onBlur={() => {
          setShowSelect(false);
          selectRef.current.size = '0';
        }}
      >
        <option value="" disabled hidden></option>
        {[...Array(11)].map((_, i) => (
          <option key={i} value={i.toString()}>
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
