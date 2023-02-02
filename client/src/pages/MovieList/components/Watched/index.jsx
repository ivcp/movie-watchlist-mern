import React from 'react';
import useUpdateMovie from '../../hooks/useUpdateMovie';
import PropTypes from 'prop-types';

const Watched = ({ movie }) => {
  const updateMovie = useUpdateMovie(movie.id);

  const handleChange = e => {
    const { checked } = e.target;
    updateMovie({ watched: checked });
  };
  return (
    <>
      <p>{movie.watched ? '✔️✔️' : '✔️'}</p>
      <label htmlFor={movie.id}>watched:</label>
      <input
        type="checkbox"
        name="watched"
        id={movie.id}
        defaultChecked={movie.watched}
        onChange={handleChange}
      />
    </>
  );
};

export default Watched;
Watched.propTypes = {
  movie: PropTypes.object.isRequired,
};
