import React from 'react';
import MovieList from '../components/MovieList';
import Search from '../components/Search';

const Home = () => {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const movies = await tmdbService.getPopularMovies();
  //       setPopularMovies(movies);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   })();
  // }, []);
  return (
    <div>
      <Search />
      <MovieList />
    </div>
  );
};

export default Home;
