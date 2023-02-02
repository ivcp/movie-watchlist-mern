import { useLoaderData } from 'react-router-dom';
import { useQuery } from 'react-query';
import getImdbRating from '../../../services/imdb';

const useMovieDetails = () => {
  const [movie, credits] = useLoaderData();
  const {
    data: imdbData,
    isError: imdbError,
    isLoading: imdbLoading,
    isSuccess: imdbSuccess,
  } = useQuery(
    ['imdbRating', movie.id],
    getImdbRating.bind(null, movie?.imdb_id)
  );
  return {
    movie,
    credits,
    imdbData,
    imdbError,
    imdbLoading,
    imdbSuccess,
  };
};

export default useMovieDetails;
