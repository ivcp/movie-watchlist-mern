import React from 'react';
import { useRouteError } from 'react-router-dom';
import styles from './style.module.css';
const MovieError = () => {
  const error = useRouteError();
  return (
    <div className={styles.error}>
      <h4>{error.message}</h4>
    </div>
  );
};

export default MovieError;
