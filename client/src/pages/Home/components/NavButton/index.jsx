import React from 'react';
import { TbChevronRight } from 'react-icons/tb';
import { TbChevronLeft } from 'react-icons/tb';
import styles from './styles.module.css';
import utils from '../../../../styles/utils.module.css';

const NavButton = ({ isDesktop, sliderRef, left, turnPage, next }) => {
  if (isDesktop)
    return (
      <button
        className={styles.navButton}
        data-test={next && 'next-page'}
        onClick={
          turnPage
            ? turnPage
            : () =>
                left
                  ? (sliderRef.current.scrollLeft -= 72)
                  : (sliderRef.current.scrollLeft += 72)
        }
      >
        {left ? (
          <TbChevronLeft size={20} strokeWidth={2} />
        ) : (
          <TbChevronRight size={20} strokeWidth={2} />
        )}
        {next ? (
          <span className={utils.srOnly}>
            {next ? 'next' : 'previous'} page
          </span>
        ) : (
          <span className={utils.srOnly}>scroll {left ? 'left' : 'right'}</span>
        )}
      </button>
    );
};

export default NavButton;
