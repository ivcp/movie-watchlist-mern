import React, { useMemo } from 'react';
import useSearch from '../../hooks/useSearch';
import { Link } from 'react-router-dom';
import debounce from '../../helpers/debounce';

const Search = () => {
  const { setQuery, data, isSuccess, isLoading, isError, error } = useSearch();

  const updateDebounceQuery = useMemo(
    () => debounce(query => setQuery(query), 500),
    []
  );

  const handleChange = ({ target }) => {
    if (target.value.trim() === '') {
      setQuery('');
      return;
    }
    updateDebounceQuery(target.value.trim());
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && data.results.length > 0 && (
        <div>
          <p>matches:</p>
          <ul>
            {data.results.map(match => (
              <li key={match.id}>
                <Link to={`/movie/${match.id}`}>{match.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isSuccess && data.results.length === 0 && <p>No matches found :(</p>}
    </div>
  );
};

export default Search;
