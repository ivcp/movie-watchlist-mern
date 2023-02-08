import React from 'react';
import styles from './styles.module.css';

const SortBtn = ({ text, sort, count, setSort }) => {
  return (
    <button
      className={`${styles.sortButton} ${
        sort === text ? styles.activeSort : ''
      }`}
      onClick={() => setSort(text)}
    >
      {text}
      <span>{count}</span>
    </button>
  );
};

export default SortBtn;
