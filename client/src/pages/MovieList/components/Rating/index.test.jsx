import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Rating from '.';
import useUpdateMovie from '../../hooks/useUpdateMovie';

vi.mock('../../hooks/useUpdateMovie');

const returnValue = vi.fn();

describe('Rating component', () => {
  const movie = {
    tmdbId: '315162',
    title: 'Puss in Boots: The Last Wish',
    poster: '/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg',
    overview:
      'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
    genre_ids: [16, 28, 12, 35, 10751, 14],
    rating: null,
    watched: false,
    id: '63c55c74ce066ec65b51a560',
  };
  it('does not appear if movie not marked as watched', () => {
    render(<Rating movie={movie} />);
    expect(screen.queryByLabelText(/add rating/i)).not.toBeInTheDocument;
  });
  it('appears if movie marked as watched', () => {
    movie.watched = true;
    render(<Rating movie={movie} />);
    screen.getByLabelText(/add rating/i);
  });

  it('calls handler with correct args', async () => {
    useUpdateMovie.mockReturnValue(returnValue);
    render(<Rating movie={movie} />);
    const user = userEvent.setup();
    const input = screen.getByLabelText(/add rating/i);
    await user.selectOptions(input, '8');
    expect(returnValue).toBeCalled();
    expect(returnValue.mock.calls[0]).toContainEqual({ rating: 8 });
  });
});
