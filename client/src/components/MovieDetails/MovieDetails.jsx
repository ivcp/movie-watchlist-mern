import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import getImdbRating from '../../services/imdb';
import { useLoaderData } from 'react-router-dom';
import useAddMovie from '../../hooks/useAddMovie';
import useMovieList from '../../hooks/useMovieList';
import GenreTag from '../UI/GenreTag';
import DetailsTag from './DetailsTag';
import DeleteMovieBtn from '../MovieList/DeleteMovieBtn';

const MovieDetails = () => {
  const [movie, credits] = useLoaderData();
  const addMovie = useAddMovie();
  const navigate = useNavigate();
  const { movieList, error, isError: movieListError } = useMovieList();
  const {
    data: imdbData,
    isError: imdbError,
    isLoading: imdbLoading,
    isSuccess: imdbSuccess,
  } = useQuery(
    ['imdbRating', movie.id],
    getImdbRating.bind(null, movie?.imdb_id)
  );
  const imdbRating = imdbData?.short?.aggregateRating?.ratingValue;
  const runtime = `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}m`;
  const year = movie.release_date.slice(0, 4);
  const directors = credits.crew.filter(c => c.job === 'Director');
  const starring = credits.cast.slice(0, 3);

  const movieOnList = movieList?.find(
    movieOnList => movieOnList.tmdbId === movie.id
  );
  const handleAddMovie = async () => {
    if (movieOnList) return;
    addMovie(movie);
  };

  if (movieListError && error.message.includes('Token expired')) {
    return <Navigate to="/" replace />; //test this
  }

  //TODO: lazy load img
  return (
    <div>
      {/* TODO: back btn only on mobile */}
      <button onClick={() => navigate(-1)}>back</button>
      <article>
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
            alt={movie.title}
            loading="lazy" //??
          />
        ) : (
          <p>no image available</p>
        )}
        <h1>{movie.title}</h1>
        <div>
          {movie.genres.map(genre => (
            <GenreTag key={genre.id}>{genre.name}</GenreTag>
          ))}
        </div>
        <div>
          {directors.length > 0 && (
            <h5>{directors.length > 1 ? 'directors' : 'director'}</h5>
          )}
          {directors.length > 0 &&
            directors.map(d => <p key={d.id}>{d.name}</p>)}
          <h5>starring</h5>
          {starring.map(actor => (
            <p key={actor.id}>{actor.name}</p>
          ))}
        </div>
        <div>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            rel="noreferrer"
            target="_blank"
          >
            {(imdbError || imdbLoading || !imdbRating) && (
              <DetailsTag detail="-" text="IMDb score" />
            )}
            {imdbSuccess && imdbRating && (
              <DetailsTag detail={imdbRating.toString()} text="IMDb score" />
            )}
          </a>
          <DetailsTag detail={runtime} text="runtime" />
          <DetailsTag detail={year} text="year" />

          {movieOnList && (
            <DetailsTag
              detail={movieOnList.watched ? 'icon-watched' : 'icon'}
              text={movieOnList.watched ? 'watched' : 'in your list'}
            />
          )}

          {!movieOnList && (
            <button onClick={handleAddMovie}>
              <div>+</div>
              add to list
            </button>
          )}
        </div>
        <p>{movie.overview}</p>
        {movieOnList && (
          <DeleteMovieBtn movie={movieOnList} text="remove from your list" />
        )}
      </article>
    </div>
  );
};

export default MovieDetails;
