import { useEffect, useState } from 'react';
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
    <div>
      {popularMovies.length > 0 &&
        popularMovies.map(movie => <p key={movie.id}>{movie.title}</p>)}
    </div>
  );
}

export default App;
