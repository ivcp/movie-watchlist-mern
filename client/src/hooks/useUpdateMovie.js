import { useQueryClient, useMutation } from 'react-query';
import movieService from '../services/movies';
import UserContext from '../store/user-context';
import { useContext } from 'react';

const useUpdateMovie = movieId => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const { mutate: updateMovie } = useMutation(
    update => movieService.updateMovie(movieId, update),
    {
      onError: error => console.log(error.message),
      onSuccess: updatedMovie => {
        const data = queryClient.getQueryData(['user', user.id]);
        queryClient.setQueryData(['user', user.id], {
          ...data,
          movies: data.movies.map(m => (m.id !== movieId ? m : updatedMovie)),
        });
      },
    }
  );

  return updateMovie;
};

export default useUpdateMovie;
