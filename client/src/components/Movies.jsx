import React from 'react';
import { useQuery } from 'react-query';
import GenreFilter from './GenreFilter';
import useGenre from '../hooks/useGenre';

const Movies = () => {
  const { queryFn, genre, setGenre, page, setPage } = useGenre();
  const {
    data: movies,
    isSuccess,
    isLoading,
  } = useQuery(['movies', genre, page], queryFn, { keepPreviousData: true });

  return (
    <>
      <GenreFilter setGenre={setGenre} setPage={setPage} />
      {isLoading && <p>Loading...</p>}
      <ul>
        {isSuccess &&
          movies.results.length > 0 &&
          movies.results.map(movie => <li key={movie.id}>{movie.title}</li>)}
      </ul>
      <div>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          -
        </button>
        {page}
        <button
          onClick={() =>
            setPage(prev =>
              movies.page === 500 || movies.page === movies.total_pages
                ? prev
                : prev + 1
            )
          }
          disabled={page === 500}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Movies;
