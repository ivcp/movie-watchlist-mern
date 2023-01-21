export const fetchData = async (url, config) => {
  const response = await fetch(url, config);
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Something went wrong :(');
    }
    if (
      url.includes('/api/users') ||
      url.includes('/api/movies') ||
      url.includes('/api/login')
    ) {
      const error = await response.json();
      throw new Error(error.error);
    } else {
      const error = await response.json();
      throw new Error(error.status_message);
    }
  }
  if (config?.method !== 'DELETE') {
    return response.json();
  }
};
