import { fetchData } from '../helpers/fetchData';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};
const resetToken = () => {
  token = null;
};

const addMovie = async movie => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(movie),
  };
  return await fetchData('/api/movies', config);
};

const deleteMovie = async movieId => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  };
  return await fetchData(`/api/movies/${movieId}`, config);
};

const updateMovie = async (movieId, update) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(update),
  };
  return await fetchData(`/api/movies/${movieId}`, config);
};

const getUserMovieList = async userId => {
  const config = {
    headers: { Authorization: token },
  };
  return await fetchData(`/api/users/${userId}`, config);
};

export default {
  addMovie,
  deleteMovie,
  updateMovie,
  getUserMovieList,
  setToken,
  resetToken,
};
