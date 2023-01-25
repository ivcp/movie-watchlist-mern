import { useContext } from 'react';
import UserContext from '../context/user-context';
import { useMutation, useQueryClient } from 'react-query';
import movieServices from '../services/movies';

const useDeleteMovie = movieId => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate: deleteMovie } = useMutation(
    () => movieServices.deleteMovie(movieId),
    {
      onError: error => console.log(error.message),
      onSuccess: () => {
        const data = queryClient.getQueryData(['movieList', user.id]);
        queryClient.setQueryData(
          ['movieList', user.id],
          data.filter(m => m.id !== movieId)
        );
        const { title } = data.find(m => m.id === movieId);
        console.log(`${title} removed from your list`);
      },
    }
  );

  return deleteMovie;
};

export default useDeleteMovie;
