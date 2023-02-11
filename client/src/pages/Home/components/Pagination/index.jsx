import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { TbChevronRight } from 'react-icons/tb';
import { TbChevronLeft } from 'react-icons/tb';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import NavButton from '../NavButton';

const Pagination = ({ page, moviesPage, totalPages, setPage }) => {
  const isDesktop = useMediaQuery('(min-width: 37.5em)');

  const turnPage = next => {
    next
      ? setPage(prev =>
          moviesPage === 500 || moviesPage === totalPages ? prev : prev + 1
        )
      : setPage(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.pagination}>
      {isDesktop ? (
        <NavButton left isDesktop={isDesktop} turnPage={() => turnPage()} />
      ) : (
        <button
          className={styles.mobileButton}
          onClick={() => turnPage()}
          disabled={page === 1}
        >
          <TbChevronLeft size={15} />
          <span>previous page</span>
        </button>
      )}
      {isDesktop ? (
        <NavButton isDesktop={isDesktop} next turnPage={() => turnPage(true)} />
      ) : (
        <button
          className={styles.mobileButton}
          onClick={() => turnPage(true)}
          disabled={moviesPage === 500}
        >
          <TbChevronRight size={15} />
          <span>next page</span>
        </button>
      )}
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
