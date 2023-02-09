import React, { useContext } from 'react';
import ModalContext from '../../context/modal-context';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { IoMdTrash } from 'react-icons/io';

const DeleteMovieBtn = props => {
  const { triggerPrompt } = useContext(ModalContext);

  return (
    <button
      className={styles.delete}
      onClick={() => triggerPrompt(props.movie)}
    >
      <span>{props.text}</span>
      <IoMdTrash />
    </button>
  );
};

export default DeleteMovieBtn;

DeleteMovieBtn.defaultProps = {
  text: 'delete movie',
};

DeleteMovieBtn.propTypes = {
  movie: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};
