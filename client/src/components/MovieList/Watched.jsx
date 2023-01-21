import React from 'react';
import useUpdateMovie from '../../hooks/useUpdateMovie';

const Watched = ({ movie }) => {
  const updateMovie = useUpdateMovie(movie.id);

  const handleChange = e => {
    const { checked } = e.target;
    updateMovie(
      { watched: checked },
      {
        onSuccess: () => {
          console.log(
            `${movie.title} marked as ${checked ? 'watched' : 'unwatched'}!`
          );
        },
      }
    );
  };
  return (
    <>
      <p>{movie.watched ? '✔️✔️' : '✔️'}</p>
      <label htmlFor={movie.id}>watched:</label>
      <input
        type="checkbox"
        name="watched"
        id={movie.id}
        defaultChecked={movie.watched}
        onChange={handleChange}
      />
    </>
  );
};

export default Watched;
