import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import useAddMovie from '../../../../hooks/useAddMovie';
import useMovieList from '../../../../hooks/useMovieList';
import Movie from '.';
import { BrowserRouter } from 'react-router-dom';

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

vi.mock('../../../../hooks/useAddMovie');
vi.mock('../../../../hooks/useMovieList');
const returnValue1 = vi.fn();
useAddMovie.mockReturnValue(returnValue1);
useMovieList.mockReturnValue({ movieList: [] });
describe('Movie component', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Movie movie={movie} />
      </BrowserRouter>
    );
  };

  it('renders movie', () => {
    setup();
    screen.getByRole('heading', { name: movie.title });
  });

  it('calls addMovie', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /\+/i }));
    expect(returnValue1).toBeCalledWith(movie);
  });
});
