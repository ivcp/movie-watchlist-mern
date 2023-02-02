import React, { useMemo, useRef } from 'react';
import useSearch from '../../hooks/useSearch';
import { Link } from 'react-router-dom';
import debounce from '../../../../helpers/debounce';
import styles from './styles.module.css';
import { TbSearch } from 'react-icons/tb';

const Search = () => {
  const { query, setQuery, data, isSuccess, isLoading, isError, error } =
    useSearch();
  const inputRef = useRef(null);
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

  const clearInput = () => {
    setQuery('');
    inputRef.current.value = '';
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <TbSearch size={14} strokeWidth={3} className={styles.searchIcon} />
        <input
          type="text"
          onKeyUp={handleChange}
          className={styles.input}
          placeholder="search"
          ref={inputRef}
        />
        {query && (
          <button onClick={clearInput} className={styles.clearBtn}>
            X
          </button>
        )}
        {isLoading && (
          <div className={styles.results}>
            <p>Loading...</p>
          </div>
        )}
        {isError && (
          <div className={styles.results}>
            <p>{error.message}</p>
          </div>
        )}
        {isSuccess && data.results.length > 0 && (
          <div className={styles.results}>
            <p>matches:</p>
            <ul role="list">
              {data.results.map(match => (
                <li key={match.id}>
                  <Link to={`/movie/${match.id}`}>
                    {match.title}
                    <span>&gt;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isSuccess && data.results.length === 0 && (
          <div className={styles.results}>
            <p>No matches found :(</p>
          </div>
        )}
      </div>
      {isSuccess && data.results.length > 0 && (
        <div className={styles.searchOverlay} onClick={clearInput}></div>
      )}
    </>
  );
};

export default Search;
