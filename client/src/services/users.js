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

export default {
  auth,
};
