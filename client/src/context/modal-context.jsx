import { createContext, useState } from 'react';
import DeletePrompt from '../components/DeletePrompt';

const ModalContext = createContext({
  modalOpen: false,
  setModalOpen: () => {},
  triggerPrompt: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [movie, setMovie] = useState(null);

  const triggerPrompt = movie => {
    setModalOpen(true);
    setMovie(movie);
  };

  return (
    <ModalContext.Provider
      value={{ modalOpen, setModalOpen, movie, triggerPrompt }}
    >
      <DeletePrompt />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
