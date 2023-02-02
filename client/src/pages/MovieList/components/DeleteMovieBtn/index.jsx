import React, { useContext } from 'react';
import ModalContext from '../../../../context/modal-context';
import PropTypes from 'prop-types';

const DeleteMovieBtn = props => {
  const { triggerPrompt } = useContext(ModalContext);

  return (
    <button onClick={() => triggerPrompt(props.movie)}>{props.text}</button>
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
