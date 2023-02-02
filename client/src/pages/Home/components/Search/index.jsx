import React, { useMemo } from 'react';
import useSearch from '../../hooks/useSearch';
import { Link } from 'react-router-dom';
import debounce from '../../../../helpers/debounce';
import styles from './styles.module.css';
import { TbSearch } from 'react-icons/tb';

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
    <div className={styles.inputContainer}>
      <TbSearch size={14} strokeWidth={3} className={styles.searchIcon} />
      <input
        type="text"
        onChange={handleChange}
        className={styles.input}
        placeholder="search"
      />
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
