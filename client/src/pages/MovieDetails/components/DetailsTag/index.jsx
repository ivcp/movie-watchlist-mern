import React from 'react';
import { TbChecks } from 'react-icons/tb';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DetailsTag = ({ detail, text }) => {
  return (
    <div className={styles.detail}>
      {detail.includes('icon') ? (
        <TbChecks
          size={21}
          className={`${styles.icon} ${
            detail === 'icon-watched' ? styles.watched : ''
          }`}
        />
      ) : (
        <div>{detail}</div>
      )}
      <p>{text}</p>
    </div>
  );
};

export default DetailsTag;

DetailsTag.propTypes = {
  detail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
