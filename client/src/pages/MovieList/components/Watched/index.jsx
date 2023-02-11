import React from 'react';
import useUpdateMovie from '../../hooks/useUpdateMovie';
import PropTypes from 'prop-types';
import { TbChecks } from 'react-icons/tb';
import utils from '../../../../styles/utils.module.css';
import styles from './styles.module.css';
const Watched = ({ movie }) => {
  const updateMovie = useUpdateMovie(movie.id);

  const handleChange = e => {
    const { checked } = e.target;
    updateMovie({ watched: checked });
  };
  return (
    <div>
      <label htmlFor={movie.id} className={styles.label} data-test="watched">
        <TbChecks
          size={22}
          className={`${styles.checks} ${movie.watched ? styles.watched : ''}`}
        />
        <span>mark as {movie.watched ? 'unwatched' : 'watched'}</span>
      </label>
      <input
        type="checkbox"
        name="watched"
        id={movie.id}
        defaultChecked={movie.watched}
        onChange={handleChange}
        className={utils.srOnly}
      />
    </div>
  );
};

export default Watched;
Watched.propTypes = {
  movie: PropTypes.object.isRequired,
};
