import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Header from './components/Header';
import Auth from './pages/Auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}
    >
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
