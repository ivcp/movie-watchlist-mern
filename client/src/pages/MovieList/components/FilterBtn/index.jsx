import React from 'react';
import styles from './styles.module.css';

const FilterBtn = ({ text, filter, count, setFilter }) => {
  return (
    <button
      className={`${styles.sortButton} ${
        filter === text ? styles.activeSort : ''
      }`}
      onClick={() => setFilter(text)}
      data-test="filter-btn"
    >
      {text}
      <span>{count}</span>
    </button>
  );
};

export default FilterBtn;
