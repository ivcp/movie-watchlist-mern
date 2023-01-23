import React from 'react';
import { useRouteError } from 'react-router-dom';

const MovieError = () => {
  const error = useRouteError();
  return (
    <div>
      <h4>{error.message}</h4>
    </div>
  );
};

export default MovieError;
