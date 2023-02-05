import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Movies from '.';
import useFetchMoviesByGenre from './hooks/useFetchMoviesByGenre';
import { BrowserRouter } from 'react-router-dom';
import useMovieList from '../../hooks/useMovieList';
import useSearch from './hooks/useSearch';

vi.mock('./hooks/useFetchMoviesByGenre');
vi.mock('./hooks/useSearch');
vi.mock('../../hooks/useAddMovie');
vi.mock('../../hooks/useMovieList');
vi.mock('../../hooks/useMediaQuery');
useMovieList.mockReturnValue({ movieList: [] });
const movies = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
      genre_ids: [878, 12, 28],
      id: 76600,
      original_language: 'en',
      original_title: 'Avatar: The Way of Water',
      overview:
        'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
      popularity: 3495.153,
      poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      release_date: '2022-12-16',
      title: 'Avatar: The Way of Water',
      video: false,
      vote_average: 7.7,
      vote_count: 3990,
    },
    {
      adult: false,
      backdrop_path: '/r9PkFnRUIthgBp2JZZzD380MWZy.jpg',
      genre_ids: [16, 28, 12, 35, 10751, 14],
      id: 315162,
      original_language: 'en',
      original_title: 'Puss in Boots: The Last Wish',
      overview:
        'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
      popularity: 10563.563,
      poster_path: '/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg',
      release_date: '2022-12-21',
      title: 'Puss in Boots: The Last Wish',
      video: false,
      vote_average: 8.6,
      vote_count: 1067,
    },
  ],
  totalPages: 5,
};

const returnValue = {
  movies,
  isSuccess: false,
  isLoading: true,
  isError: false,
  error: '',
  page: '1',
  setGenre: vi.fn(),
  setPage: vi.fn(),
};

useSearch.mockReturnValue({ setQuery: vi.fn() });

describe('movies component', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Movies />
      </BrowserRouter>
    );
  };

  it('renders skeletons if loading', () => {
    useFetchMoviesByGenre.mockReturnValue(returnValue);
    setup();
    const skeletons = screen.getAllByTestId('loading-image');
    expect(skeletons).toHaveLength(10);
  });
  it('renders message if error', () => {
    returnValue.isSuccess = false;
    returnValue.isLoading = false;
    returnValue.isError = true;
    returnValue.error = {
      message: 'Test error message',
    };

    useFetchMoviesByGenre.mockReturnValue(returnValue);
    setup();
    screen.getByText(returnValue.error.message);
  });
  it('renders movies and pagination if success', () => {
    returnValue.isSuccess = true;
    returnValue.isError = false;

    useFetchMoviesByGenre.mockReturnValue(returnValue);
    setup();
    screen.getByText(movies.results[0].title);
    screen.getByText(movies.results[1].title);
    screen.getByRole('button', { name: /previous page/i });
    screen.getByRole('button', { name: /next page/i });
  });
  it('calls setPage if pagination buttons pressed', async () => {
    useFetchMoviesByGenre.mockReturnValue(returnValue);
    setup();
    const user = userEvent.setup();
    const nextBtn = screen.getByRole('button', { name: /next page/i });
    await user.click(nextBtn);
    expect(returnValue.setPage).toBeCalled();
  });
});
