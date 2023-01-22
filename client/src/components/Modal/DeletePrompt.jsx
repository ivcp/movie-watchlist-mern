import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import useDeleteMovie from '../../hooks/useDeleteMovie';
import ModalContext from '../../store/modal-context';

const DeletePrompt = () => {
  const { modalOpen, setModalOpen, movie } = useContext(ModalContext);
  const deleteMovie = useDeleteMovie(movie?.id);
  if (modalOpen) {
    return createPortal(
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'orangered',
          opacity: 0.8,
        }}
        onClick={() => setModalOpen(false)}
      >
        <div
          style={{ backgroundColor: 'white' }}
          onClick={e => e.stopPropagation()}
        >
          <p>
            Are you sure that you want to delete ${movie.title} from your list?{' '}
          </p>
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
      </div>,
      document.getElementById('modal')
    );
  } else {
    return null;
  }
};

export default DeletePrompt;
