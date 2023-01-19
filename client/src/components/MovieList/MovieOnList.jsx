import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import genres from '../../helpers/genres';

const MovieOnList = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);

  const expandDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <article>
      <h4>{movie.title}</h4>
      <div>
        {movie.watched && (
          <>
            {!movie.rating && <p>star icon</p>}
            {movie.rating && <p>{movie.rating}/10</p>}
            <label htmlFor="rating">add rating</label>
            <select name="rating" id="rating">
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </>
        )}
        {/* watched icon */}
        <label htmlFor={movie.id}>watched:</label>
        <input
          type="checkbox"
          name="watched"
          id={movie.id}
          defaultChecked={movie.watched}
        />
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
            <button>delete movie</button>
          </div>
        </div>
      )}
    </article>
  );
};

export default MovieOnList;
