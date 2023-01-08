import React from 'react';
import MovieList from '../components/MovieList';
import Search from '../components/Search';

const Home = ({ popularMovies }) => {
  return (
    <div>
      <Search />
      <MovieList popularMovies={popularMovies} />
    </div>
  );
};

export default Home;
