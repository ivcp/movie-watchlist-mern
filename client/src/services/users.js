import { fetchData } from '../helpers/fetchData';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const auth = async (credentials, type) => {
  const response = await fetch(`/api/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Something went wrong :(');
    }
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

const getUserDetails = async userId => {
  const config = {
    headers: { Authorization: token },
  };
  return await fetchData(`/api/users/${userId}`, config);
};

export default {
  auth,
  getUserDetails,
  setToken,
};
