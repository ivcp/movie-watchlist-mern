const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

it('calls TMDB api', async () => {
  const response = await api.get('/api/movies');
  expect(response.body).toHaveLength(20);
});
