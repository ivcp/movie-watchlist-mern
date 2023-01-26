import React from 'react';
import useUpdateMovie from '../../hooks/useUpdateMovie';
import PropTypes from 'prop-types';

const Rating = ({ movie }) => {
  const updateMovie = useUpdateMovie(movie.id);

  const handleChange = e => {
    updateMovie({ rating: +e.target.value });
  };
  return (
    <>
      {movie.rating === null && <p>star icon</p>}
      {Number.isFinite(movie.rating) && <p>{movie.rating}/10</p>}
      <label htmlFor="rating">add rating</label>
      <select name="rating" id="rating" defaultValue="" onChange={handleChange}>
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
