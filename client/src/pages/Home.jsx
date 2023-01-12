import React from 'react';
import Movies from '../components/Movies/Movies';
import Search from '../components/Search';

const Home = () => {
  return (
    <div>
      <Search />
      <Movies />
    </div>
  );
};

export default Home;
