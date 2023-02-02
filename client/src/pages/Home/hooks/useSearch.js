import { useState } from 'react';
import { useQuery } from 'react-query';
import tmdbService from '../../../services/tmdb';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const { data, isSuccess, isLoading, isError, error } = useQuery(
    ['search', query],
    tmdbService.searchMovies.bind(null, query),
    { enabled: !!query }
  );

  return {
    query,
    setQuery,
    data,
    isSuccess,
    isLoading,
    isError,
    error,
  };
};

export default useSearch;
