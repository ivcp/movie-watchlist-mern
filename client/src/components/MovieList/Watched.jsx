import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import movieService from '../../services/movies';

const Watched = ({ movie, user, data }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    update => movieService.updateMovie(movie.id, update),
    {
      onError: error => console.log(error.message),
      onSuccess: updatedMovie => {
        console.log(
          `${updatedMovie.title} marked as ${
            updatedMovie.watched ? 'watched' : 'unwatched'
          }!`
        );
        queryClient.setQueryData(['user', user.id], {
          ...data,
          movies: data.movies.map(m => (m.id !== movie.id ? m : updatedMovie)),
        });
      },
    }
  );

  const handleChange = e => {
    mutate({ watched: e.target.checked });
  };
  return (
    <>
      {/* icon watched */}
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
