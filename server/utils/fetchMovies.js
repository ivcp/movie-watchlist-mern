const fetchMovies = async (url, res) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    return res.status(400).json(error);
  }
  const data = await response.json();
  res.json(data);
};

module.exports = fetchMovies;
