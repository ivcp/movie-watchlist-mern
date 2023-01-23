import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import UserContext from '../store/user-context';
import movieService from '../services/movies';

const useAddMovie = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  const { mutate: addMovie } = useMutation(
    movie => {
      const genreArr = movie.genres
        ? movie.genres.map(genre => genre.id)
        : movie.genre_ids;
      return movieService.addMovie({
        tmdbId: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path,
        genre_ids: genreArr,
      });
    },
    {
      onError: error => console.log(error.message), //set notification
      onSuccess: movie => {
        const data = queryClient.getQueryData(['user', user.id]);
        queryClient.setQueryData(['user', user.id], [...data, movie]);
        console.log(`${movie.title} added to list`);
      },
    }
  );

  return addMovie;
};

export default useAddMovie;
