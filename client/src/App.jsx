import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserContextProvider } from './store/user-context';
import { ModalContextProvider } from './store/modal-context';
import Home from './pages/Home';
import Layout from './layout/Layout';
import Auth from './pages/Auth';
import WatchList from './pages/Watchlist';
import MovieDetailsPage from './pages/MovieDetailsPage';
import tmdbService from './services/tmdb';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/mymovies" element={<WatchList />} />
      <Route
        path="/movie/:movieId"
        loader={({ params }) => tmdbService.getMovieDetails(params.movieId)}
        element={<MovieDetailsPage />}
      />
      <Route path="*" element={<p>PAGE NOT FOUND</p>} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ModalContextProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ModalContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
