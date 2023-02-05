import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import genreStyles from '../GenreFilter/styles.module.css';
import { TbChevronRight } from 'react-icons/tb';
import { TbChevronLeft } from 'react-icons/tb';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const Pagination = ({ page, moviesPage, totalPages, setPage }) => {
  const isDesktop = useMediaQuery('(min-width: 37.5em)');
  return (
    <div className={styles.pagination}>
      <button
        className={isDesktop ? genreStyles.navButton : styles.mobileButton}
        onClick={() => {
          setPage(prev => Math.max(prev - 1, 1));
          window.scrollTo(0, 0);
        }}
        disabled={page === 1}
      >
        <TbChevronLeft size={15} />
        <span>previous page</span>
      </button>
      <button
        className={isDesktop ? genreStyles.navButton : styles.mobileButton}
        onClick={() => {
          setPage(prev =>
            moviesPage === 500 || moviesPage === totalPages ? prev : prev + 1
          );
          window.scrollTo(0, 0);
        }}
        disabled={moviesPage === 500}
      >
        <TbChevronRight size={15} />
        <span>next page</span>
      </button>
    </div>
  );
};

export default Pagination;
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  moviesPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
