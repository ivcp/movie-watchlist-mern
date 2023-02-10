import { useQueryClient, useMutation } from 'react-query';
import movieService from '../../../services/movies';
import UserContext from '../../../context/user-context';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const useUpdateMovie = movieId => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const { mutate: updateMovie } = useMutation(
    update => movieService.updateMovie(movieId, update),
    {
      onError: error => toast.info(error.message),
      onSuccess: updatedMovie => {
        const data = queryClient.getQueryData(['movieList', user.id]);
        queryClient.setQueryData(
          ['movieList', user.id],
          data.map(m => (m.id !== movieId ? m : updatedMovie))
        );
      },
    }
  );

  return updateMovie;
};

export default useUpdateMovie;
