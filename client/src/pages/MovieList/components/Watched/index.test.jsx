import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Watched from '.';
import useUpdateMovie from '../../hooks/useUpdateMovie';

vi.mock('../../hooks/useUpdateMovie');

const returnValue = vi.fn();

describe('Watched component', () => {
  it('shows watched status', async () => {
    const movie = {
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
    useUpdateMovie.mockReturnValue(returnValue);
    render(<Watched movie={movie} />);
    const watched = screen.getByLabelText(/mark as unwatched/i);
    expect(watched).toBeChecked();
    const user = userEvent.setup();
    await user.click(watched);
    expect(returnValue).toHaveBeenCalled();
    expect(returnValue.mock.calls[0]).toContainEqual({ watched: false });
  });
});
