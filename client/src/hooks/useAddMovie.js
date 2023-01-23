import { useMutation } from 'react-query';
import movieService from '../services/movies';

const useAddMovie = () => {
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
      onSuccess: movie => console.log(movie), //set notification
    }
  );

  return addMovie;
};

export default useAddMovie;
