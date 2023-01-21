import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import useMovieList from '../../../hooks/useMovieList';
import MovieList from '../MovieList';

vi.mock('../../../hooks/useMovieList');
vi.mock('../../../hooks/useUpdateMovie');
vi.mock('../../../hooks/useDeleteMovie');

describe('MovieList component', () => {
  it('renders loading if isLoading', () => {
    useMovieList.mockReturnValue(returnValue);
    render(<MovieList />);
    screen.getByText(/loading.../i);
  });
  it('renders error msg if isLoading', () => {
    returnValue.isLoading = false;
    returnValue.isError = true;
    useMovieList.mockReturnValue(returnValue);
    render(<MovieList />);
    screen.getByText(/test error message/i);
  });
  it('renders list of movies if isSuccess', () => {
    returnValue.isSuccess = true;
    returnValue.isError = false;
    useMovieList.mockReturnValue(returnValue);
    render(<MovieList />);
    screen.getByText(returnValue.movies[0].title);
    screen.getByText(returnValue.movies[1].title);
    screen.getByText(returnValue.movies[2].title);
  });
  it('filters movies by watched status', async () => {
    render(<MovieList />);
    const user = userEvent.setup();
    const allBtn = screen.getByRole('button', { name: /all/i });
    const watchedBtn = screen.getByRole('button', { name: 'watched' });
    const unwatchedBtn = screen.getByRole('button', { name: /unwatched/i });
    await user.click(watchedBtn);
    expect(returnValue.setMovies.mock.lastCall[0]).toContainEqual(
      returnValue.movies[0]
    );
    await user.click(unwatchedBtn);
    expect(returnValue.setMovies.mock.lastCall[0]).toContainEqual(
      returnValue.movies[1]
    );
    expect(returnValue.setMovies.mock.lastCall[0]).toContainEqual(
      returnValue.movies[2]
    );
    await user.click(allBtn);
    expect(returnValue.setMovies.mock.lastCall[0]).toContainEqual(
      returnValue.movies[0]
    );
    expect(returnValue.setMovies.mock.lastCall[0]).toContainEqual(
      returnValue.movies[1]
    );
    expect(returnValue.setMovies.mock.lastCall[0]).toContainEqual(
      returnValue.movies[2]
    );
  });
  it('displays message if no saved movies', async () => {
    returnValue.data.movies = [];
    returnValue.movies = [];
    render(<MovieList />);
    screen.getByText(/Add some movies to your list, test/i);
  });
});

//mock data
const data = {
  name: 'Tom Cruise',
  email: 'tom@email.com',
  movies: [
    {
      tmdbId: '315162',
      title: 'Puss in Boots: The Last Wish',
      poster: '/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg',
      overview:
        'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
      genre_ids: [16, 28, 12, 35, 10751, 14],
      watched: true,
      id: '63c55c74ce066ec65b51a560',
    },
    {
      tmdbId: '76600',
      title: 'Avatar: The Way of Water',
      poster: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      overview:
        'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
      genre_ids: [878, 12, 28],
      watched: false,
      id: '63c55caece066ec65b51a566',
    },
    {
      tmdbId: '899112',
      title: 'Violent Night',
      poster: '/1XSYOP0JjjyMz1irihvWywro82r.jpg',
      overview:
        'When a team of mercenaries breaks into a wealthy family compound on Christmas Eve, taking everyone inside hostage, the team isn’t prepared for a surprise combatant: Santa Claus is on the grounds, and he’s about to show why this Nick is no saint.',
      genre_ids: [28, 35, 80, 53],
      watched: false,
      id: '63c55cedce066ec65b51a56c',
    },
  ],
  id: '63c2d08cc5e7c6a9cefe8802',
};

const returnValue = {
  user: { name: 'Test user' },
  movies: data.movies,
  setMovies: vi.fn(),
  data,
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: {
    message: 'test error message',
  },
};
