const fetchMovies = async (url, res, details) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    return res.status(400).json(error);
  }
  if (!details) {
    const { results } = await response.json();
    res.json(results);
  }

  if (details) {
    const data = await response.json();
    res.json(data);
  }
};

module.exports = fetchMovies;
