import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import useMovieDetails from './hooks/useMovieDetails';
import useAddMovie from '../../hooks/useAddMovie';
import useMovieList from '../../hooks/useMovieList';
import GenreTag from '../../components/GenreTag';
import DetailsTag from './components/DetailsTag';
import DeleteMovieBtn from '../../components/DeleteMovieBtn';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './styles.module.css';
import noImage from '../../assets/no-img.svg';
import { TbArrowLeft } from 'react-icons/tb';
import utils from '../../styles/utils.module.css';

const MovieDetails = () => {
  const { movie, credits, imdbData, imdbError, imdbLoading, imdbSuccess } =
    useMovieDetails();
  const addMovie = useAddMovie();
  const navigate = useNavigate();
  const { movieList, error, isError: movieListError } = useMovieList();
  const isDesktop = useMediaQuery('(min-width: 37.5em)');

  useEffect(() => {
    document.title = movie.title;
  }, []);

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

  let watchedStatus;

  if (movieOnList?.watched) {
    watchedStatus = movieOnList.rating
      ? `rated ${movieOnList.rating}/10`
      : 'watched';
  } else {
    watchedStatus = 'in your list';
  }

  if (movieListError && error.message.includes('Token expired')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      {!isDesktop && (
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <TbArrowLeft size={30} strokeWidth={2.5} />
          <span className={utils.srOnly}>back</span>
        </button>
      )}
      <article className={styles.movieDetails}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
              : noImage
          }
          alt={movie.title}
        />
        <h1>{movie.title}</h1>
        <div className={styles.genres}>
          {movie.genres.map(genre => (
            <GenreTag key={genre.id} details>
              {genre.name}
            </GenreTag>
          ))}
        </div>
        <div className={styles.castAndCrew}>
          <div>
            {directors.length > 0 && (
              <h5>{directors.length > 1 ? 'directors:' : 'director:'}</h5>
            )}
            {directors.length > 0 &&
              directors.map((d, i) => (
                <p key={d.id}>
                  {d.name}
                  {i === directors.length - 1 ? '' : ','}
                </p>
              ))}
          </div>
          <div>
            <h5>starring:</h5>
            {starring.map((actor, i) => (
              <p key={actor.id}>
                {actor.name}
                {i === starring.length - 1 ? '' : ','}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.detailsContainer}>
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
              text={watchedStatus}
            />
          )}

          {!movieOnList && (
            <button onClick={handleAddMovie}>
              <div>+</div>
              <span> add to list</span>
            </button>
          )}
        </div>
        <p className={styles.overview} data-test="overview">
          {movie.overview}
        </p>
        {movieOnList && (
          <div className={styles.deleteBtn}>
            <DeleteMovieBtn movie={movieOnList} text="remove from your list" />
          </div>
        )}
      </article>
    </div>
  );
};

export default MovieDetails;
