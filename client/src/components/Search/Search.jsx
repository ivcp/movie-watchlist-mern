import React from 'react';
import useSearch from '../../hooks/useSearch';

const Search = () => {
  const { setQuery, data, isSuccess, isLoading, isError, error } = useSearch();

  const handleChange = ({ target }) => {
    if (target.value.trim() === '') {
      setQuery('');
      return;
    }
    setQuery(target.value.trim());
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
              <li key={match.id}>{match.title}</li>
            ))}
          </ul>
        </div>
      )}
      {isSuccess && data.results.length === 0 && <p>No matches found :(</p>}
    </div>
  );
};

export default Search;
