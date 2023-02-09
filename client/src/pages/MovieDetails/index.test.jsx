import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import useMovieDetails from './hooks/useMovieDetails';
import useMovieList from '../../hooks/useMovieList';
import MovieDetails from '.';
import { BrowserRouter } from 'react-router-dom';

vi.mock('./hooks/useMovieDetails');
vi.mock('../../hooks/useAddMovie');
vi.mock('../../hooks/useMovieList');
vi.mock('../../hooks/useMediaQuery');

describe('MovieDetails component', () => {
  const setupRender = () => {
    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );
  };
  useMovieDetails.mockReturnValue(returnValue);
  it('Renders movie details', () => {
    useMovieList.mockReturnValue({
      movieList: [],
    });
    setupRender();
    screen.getByRole('heading', { name: 'Avatar: The Way of Water' });
    screen.getByRole('img', { name: 'Avatar: The Way of Water' });
    screen.getByText(/science fiction/i);
    screen.getByText(/test director/i);
    screen.getByText(/test actor/i);
    screen.getByRole('button', { name: /add to list/i });
    expect(screen.queryByRole('button', { name: /remove from your list/i })).not
      .toBeInTheDocument;
  });
  it('shows if movie is on users list and remove btn', () => {
    useMovieList.mockReturnValue({
      movieList: [{ tmdbId: 76600, watched: false }],
    });
    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );
    screen.getByText(/in your list/i);
    screen.getByRole('button', { name: /remove from your list/i });
    expect(screen.queryByRole('button', { name: /add to list/i })).not
      .toBeInTheDocument;
  });
});

// mock data

const movie = {
  adult: false,
  backdrop_path: '/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
  belongs_to_collection: {
    id: 87096,
    name: 'Avatar Collection',
    poster_path: '/uO2yU3QiGHvVp0L5e5IatTVRkYk.jpg',
    backdrop_path: '/iaEsDbQPE45hQU2EGiNjXD2KWuF.jpg',
  },
  budget: 460000000,
  genres: [
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 28,
      name: 'Action',
    },
  ],
  homepage: 'https://www.avatar.com/movies/avatar-the-way-of-water',
  id: 76600,
  imdb_id: 'tt1630029',
  original_language: 'en',
  original_title: 'Avatar: The Way of Water',
  overview:
    'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
  popularity: 2391.76,
  poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
  production_companies: [
    {
      id: 574,
      logo_path: '/iB6GjNVHs5hOqcEYt2rcjBqIjki.png',
      name: 'Lightstorm Entertainment',
      origin_country: 'US',
    },
    {
      id: 127928,
      logo_path: '/cxMxGzAgMMBhTXkcpYYCxWCOY90.png',
      name: '20th Century Studios',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2022-12-14',
  revenue: 2024000000,
  runtime: 192,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'Return to Pandora.',
  title: 'Avatar: The Way of Water',
  video: false,
  vote_average: 7.739,
  vote_count: 4695,
};

const credits = {
  cast: [
    {
      name: 'test actor',
    },
  ],
  crew: [
    {
      name: 'test director',
      job: 'Director',
    },
  ],
};

const returnValue = {
  movie,
  credits,
};
