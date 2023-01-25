import React, { useContext } from 'react';
import ModalContext from '../../context/modal-context';
import PropTypes from 'prop-types';

const DeleteMovie = props => {
  const { triggerPrompt } = useContext(ModalContext);

  return (
    <button onClick={() => triggerPrompt(props.movie)}>{props.text}</button>
  );
};

export default DeleteMovie;

DeleteMovie.defaultProps = {
  text: 'delete movie',
};

DeleteMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};
