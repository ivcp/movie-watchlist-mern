import React from 'react';
import styles from './styles.module.css';
const GenreTag = ({ children, details }) => {
  return (
    <div className={`${styles.genre} ${details ? styles.details : ''}`}>
      {children}
    </div>
  );
};

export default GenreTag;
