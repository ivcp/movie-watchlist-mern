import React, { useMemo, useRef } from 'react';
import useSearch from '../../hooks/useSearch';
import { Link } from 'react-router-dom';
import debounce from '../../../../helpers/debounce';
import styles from './styles.module.css';
import { TbSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { query, setQuery, data, isSuccess, isLoading, isError, error } =
    useSearch();
  const navigate = useNavigate();
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

  const arrowNavigation = e => {
    if (e.keyCode !== 40) return;
    if (!isSuccess) return;
    document.querySelector('li[role="tab"]').focus();
  };

  const selectSearchResult = (movie, e) => {
    if (e.keyCode === 13) navigate(`/movie/${movie}`);
    if (e.keyCode === 40) {
      e.target.nextElementSibling
        ? e.target.nextElementSibling.focus()
        : document.querySelector('li[role="tab"]').focus();
    }
    if (e.keyCode === 38) {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
        return;
      }
      inputRef.current.focus();
    }
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
          onKeyDown={arrowNavigation}
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
          <div className={styles.results} data-test="search-results">
            <p>matches:</p>
            <ul role="tablist">
              {data.results.map(match => (
                <li
                  key={match.id}
                  role="tab"
                  tabIndex={0}
                  onKeyDown={e => selectSearchResult(match.id, e)}
                >
                  <Link to={`/movie/${match.id}`}>
                    {match.title}{' '}
                    {match.release_date
                      ? `(${match.release_date.slice(0, 4)})`
                      : ''}
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
