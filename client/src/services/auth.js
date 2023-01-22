import { fetchData } from '../helpers/fetchData';

const auth = async (credentials, type) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };
  return await fetchData(`/api/${type}`, config);
};

export default auth;
