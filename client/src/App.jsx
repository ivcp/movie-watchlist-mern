import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import tbdbService from './services/tmdb';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const movies = await tbdbService.getPopularMovies();
        setPopularMovies(movies);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home popularMovies={popularMovies} />} />
    </Routes>
  );
}

export default App;
