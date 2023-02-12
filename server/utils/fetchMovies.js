const fetch = require('node-fetch');
const fetchMovies = async (url, res, page) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    return res.status(400).json(error);
  }
  const data = await response.json();
  if (data.results) {
    if (!page) {
      res.json(data);
      return;
    }
    const resultArray =
      page % 2 === 0 ? data.results.slice(10) : data.results.slice(0, 10);
    res.json({
      page: data.page,
      results: resultArray,
      totalPages: data.total_pages,
    });
  } else {
    res.json(data);
  }
};

module.exports = fetchMovies;
