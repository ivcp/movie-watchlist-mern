import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ModalContext from '../../context/modal-context';
import useDeleteMovie from '../../hooks/useDeleteMovie';
import DeletePrompt from '.';

vi.mock('../../hooks/useDeleteMovie');
const returnValue = vi.fn();
const modalEl = document.createElement('div');
modalEl.setAttribute('id', 'modal');
document.body.appendChild(modalEl);

describe('Delete Prompt', () => {
  const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <ModalContext.Provider {...providerProps}>{ui}</ModalContext.Provider>,
      renderOptions
    );
  };
  const providerProps = {
    value: {
      modalOpen: false,
      setModalOpen: vi.fn(),
      movie: null,
      triggerPrompt: vi.fn(),
    },
  };
  useDeleteMovie.mockReturnValue(returnValue);
  it('does not display modal if modalOpen is false', () => {
    customRender(<DeletePrompt />, { providerProps });

    expect(screen.queryByText(/are you sure that you want to delete/i)).not
      .toBeInTheDocument;
  });
  it('renders modal if modalOpen is true', () => {
    providerProps.value.modalOpen = true;
    providerProps.value.movie = {
      tmdbId: '315162',
      title: 'Puss in Boots: The Last Wish',
      poster: '/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg',
      overview:
        'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
      genre_ids: [16, 28, 12, 35, 10751, 14],
      rating: null,
      watched: true,
      id: '63c55c74ce066ec65b51a560',
    };
    customRender(<DeletePrompt />, { providerProps });
    screen.getByText(/are you sure that you want to delete/i);
  });
  it('calls setModalOpen with correct args when clicked on overlay', async () => {
    customRender(<DeletePrompt />, { providerProps });
    const user = userEvent.setup();
    await user.click(screen.getByTestId('overlay'));
    expect(providerProps.value.setModalOpen).toHaveBeenCalledWith(false);
  });
  it('does not do anything if clicked on modal box', async () => {
    customRender(<DeletePrompt />, { providerProps });
    const user = userEvent.setup();
    await user.click(screen.getByTestId('modal-box'));
    screen.getByText(/are you sure that you want to delete/i);
    expect(providerProps.value.setModalOpen).not.toBeCalledTimes(2);
  });
  it('calls setModal with correct args if clicked on cancel btn', async () => {
    customRender(<DeletePrompt />, { providerProps });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(providerProps.value.setModalOpen).toHaveBeenCalledWith(false);
  });
  it('calls deleteMovie if clicked on yes btn', async () => {
    customRender(<DeletePrompt />, { providerProps });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /yes/i }));
    expect(returnValue).toHaveBeenCalled();
    expect(providerProps.value.setModalOpen).toHaveBeenCalledWith(false);
  });
});
