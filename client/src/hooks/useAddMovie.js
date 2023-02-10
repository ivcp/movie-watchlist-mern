import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import UserContext from '../context/user-context';
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
      onError: error => toast.info(error.message),
      onSuccess: movie => {
        const data = queryClient.getQueryData(['movieList', user.id]);
        queryClient.setQueryData(['movieList', user.id], [...data, movie]);
        toast.success(`${movie.title} added to list`);
      },
    }
  );

  return addMovie;
};

export default useAddMovie;
