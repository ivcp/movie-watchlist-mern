import { useContext } from 'react';
import UserContext from '../context/user-context';
import { useMutation, useQueryClient } from 'react-query';
import movieServices from '../services/movies';
import { toast } from 'react-toastify';

const useDeleteMovie = movieId => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate: deleteMovie } = useMutation(
    () => movieServices.deleteMovie(movieId),
    {
      onError: error => toast.info(error.message),
      onSuccess: () => {
        const data = queryClient.getQueryData(['movieList', user.id]);
        queryClient.setQueryData(
          ['movieList', user.id],
          data.filter(m => m.id !== movieId)
        );
        const { title } = data.find(m => m.id === movieId);
        toast.info(`${title} removed from your list`);
      },
    }
  );

  return deleteMovie;
};

export default useDeleteMovie;
