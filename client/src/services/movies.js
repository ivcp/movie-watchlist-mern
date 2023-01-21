let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const addMovie = async movie => {
  const response = await fetch('/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Something went wrong :(');
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  }
  return response.json();
};

const deleteMovie = async movieId => {
  const response = await fetch(`/api/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Something went wrong :(');
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  }
};

const updateMovie = async (movieId, update) => {
  const response = await fetch(`/api/movies/${movieId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(update),
  });
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Something went wrong :(');
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  }
  return response.json();
};

export default {
  addMovie,
  deleteMovie,
  updateMovie,
  setToken,
};
