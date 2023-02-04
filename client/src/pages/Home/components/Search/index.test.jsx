import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Search from '../..';
import useSearch from '../../hooks/useSearch';
import useFetchMoviesByGenre from '../../hooks/useFetchMoviesByGenre';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../hooks/useSearch');
vi.mock('../../hooks/useFetchMoviesByGenre');
vi.mock('../../../../hooks/useMediaQuery');

const data = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/r9leYNa8nTRCceZrZhP1DXkgKVb.jpg',
      genre_ids: [27, 9648, 878],
      id: 1091,
      original_language: 'en',
      original_title: 'The Thing',
      overview:
        'A team of American scientists investigate the empty, destroyed base of their Norwegian counterparts in Antarctica, only to discover a terrifying life force that can take the form of its prey.',
      popularity: 48.77,
      poster_path: '/tzGY49kseSE9QAKk47uuDGwnSCu.jpg',
      release_date: '1982-06-25',
      title: 'The Thing',
      video: false,
      vote_average: 8,
      vote_count: 5761,
    },
    {
      adult: false,
      backdrop_path: '/5u2YFvWKZuhZBRWQBrAXv7ryFix.jpg',
      genre_ids: [28, 35, 27],
      id: 343701,
      original_language: 'fi',
      original_title: 'Bunny the Killer Thing',
      overview:
        'A group of Finnish and British people get stuck to a cabin when a creature which is a half human, half rabbit, attacks on them. The creature is Bunny the Killer Thing, and it is after anything that is resembling female genitals.',
      popularity: 7.598,
      poster_path: '/jf60iokom85QDGkIjc18bB6yA3F.jpg',
      release_date: '2015-07-25',
      title: 'Bunny the Killer Thing',
      video: false,
      vote_average: 4.5,
      vote_count: 56,
    },
  ],
  total_pages: 1,
  total_results: 2,
};

const returnValue = {
  data,
  setQuery: vi.fn(),
  isSuccess: false,
  isLoading: true,
  isError: false,
  error: {
    message: 'test error message',
  },
};

useFetchMoviesByGenre.mockReturnValue({ movies: [] });

describe('Search component', () => {
  const setupRender = () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
  };
  it('renders loading text if isLoading', () => {
    useSearch.mockReturnValue(returnValue);
    setupRender();
    screen.getByText(/loading.../i);
  });
  it('renders error msg text if isError', () => {
    returnValue.isError = true;
    returnValue.isSuccess = false;
    returnValue.isLoading = false;
    useSearch.mockReturnValue(returnValue);
    setupRender();
    screen.getByText(/test error message/i);
  });
  it('renders matches if isSuccess and there are matches', () => {
    returnValue.isError = false;
    returnValue.isSuccess = true;
    useSearch.mockReturnValue(returnValue);
    setupRender();
    screen.getByText(/the thing/i);
    screen.getByText(/bunny the killer thing/i);
  });
  it('renders message if isSuccess and there are no matches', () => {
    returnValue.data.results = [];
    useSearch.mockReturnValue(returnValue);
    setupRender();
    screen.getByText(/no matches found/i);
  });
  it('calls setQuery with correct args when user types', async () => {
    setupRender();
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { type: /text/i });
    await user.type(input, 'hello');
    await waitFor(() => expect(returnValue.setQuery).toHaveBeenCalled(1));
    await waitFor(() =>
      expect(returnValue.setQuery).toHaveBeenCalledWith(['hello'])
    );
  });
});
