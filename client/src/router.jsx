import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import MovieError from './pages/MovieDetails/components/MovieError';
import tmdbService from './services/tmdb';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/mymovies" element={<MovieList />} />
      <Route
        path="/movie/:movieId"
        loader={async ({ params }) => {
          const response = await Promise.all([
            tmdbService.getMovieDetails(params.movieId),
            tmdbService.getMovieCredits(params.movieId),
          ]);
          return response;
        }}
        element={<MovieDetails />}
        errorElement={<MovieError />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;
