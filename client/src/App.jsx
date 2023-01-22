import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ModalContextProvider } from './store/modal-context';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Auth from './pages/Auth';
import WatchList from './pages/Watchlist';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/mymovies" element={<WatchList />} />
          </Routes>
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </ModalContextProvider>
    </QueryClientProvider>
  );
}

export default App;
