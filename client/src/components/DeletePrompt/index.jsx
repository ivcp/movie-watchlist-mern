import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import useDeleteMovie from '../../hooks/useDeleteMovie';
import ModalContext from '../../context/modal-context';
import styles from './style.module.css';

const DeletePrompt = () => {
  const { modalOpen, setModalOpen, movie } = useContext(ModalContext);
  const deleteMovie = useDeleteMovie(movie?.id);
  if (modalOpen) {
    return createPortal(
      <div
        className={styles.overlay}
        data-testid="overlay"
        onClick={() => setModalOpen(false)}
      >
        <div
          className={styles.modal}
          data-testid="modal-box"
          onClick={e => e.stopPropagation()}
        >
          <p>
            {`Are you sure that you want to delete ${movie.title} from your
            list?`}
          </p>
          <div>
            <button
              onClick={() => {
                deleteMovie();
                setModalOpen(false);
              }}
            >
              yes
            </button>
            <button onClick={() => setModalOpen(false)}>cancel</button>
          </div>
        </div>
      </div>,
      document.getElementById('modal')
    );
  } else {
    return null;
  }
};

export default DeletePrompt;
