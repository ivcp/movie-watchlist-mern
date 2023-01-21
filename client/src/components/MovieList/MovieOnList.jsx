import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import genres from '../../helpers/genres';
import Rating from './Rating';
import Watched from './Watched.jsx';
import { useMutation } from 'react-query';
import movieServices from '../../services/movies';

const MovieOnList = ({ movie, setMovies }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { mutate: deleteMovie } = useMutation(
    () => movieServices.deleteMovie(movie.id),
    {
      onError: error => console.log(error.message),
      onSuccess: () => {
        console.log(`${movie.title} removed from your list`);
        setMovies(prev => prev.filter(m => m.id !== movie.id));
      },
    }
  );

  const expandDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <article>
      <h4>{movie.title}</h4>
      <div>
        {movie.watched && <Rating movie={movie} />}
        <Watched movie={movie} />
      </div>
      <button onClick={expandDetails}>expand</button>
      {showDetails && (
        <div>
          <div>
            {movie.genre_ids.map(genre => {
              const result = genres.reduce(
                (acc, cur) => (cur.id === genre ? acc + cur.name : acc),
                ''
              );
              return <p key={genre}>{result}</p>;
            })}
          </div>
          <div>{movie.overview}</div>
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.poster}`}
            alt={movie.title}
          />
          <div>
            <Link to={`/movie/${movie.tmdbId}`}>more details</Link>
            <button onClick={() => deleteMovie()}>delete movie</button>
          </div>
        </div>
      )}
    </article>
  );
};

export default MovieOnList;
