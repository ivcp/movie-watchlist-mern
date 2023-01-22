import React from 'react';
import { useLoaderData } from 'react-router-dom';

const MovieDetails = () => {
  const movie = useLoaderData();
  console.log(movie);
  return <div>MovieDetails</div>;
};

export default MovieDetails;
