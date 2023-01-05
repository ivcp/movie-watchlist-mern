const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Movie = require('../models/movie');
//const User = require('../models/movie');
const helper = require('./helper');
const movies = require('./movies');

beforeEach(async () => {
  await Movie.deleteMany({});
}, 10000);

const api = supertest(app);

describe('movies', () => {
  let headers;
  beforeEach(async () => {
    const user = {
      firstName: 'test',
      lastName: 'tester',
      email: 'test@testing.com',
      password: '123456',
    };
    await api.post('/api/users').send(user);
    const login = await api
      .post('/api/login')
      .send({ email: 'test@testing.com', password: '123456' });
    headers = { Authorization: `bearer ${login.body.token}` };
  });

  it('adds new movie', async () => {
    await api
      .post('/api/movies')
      .send(movies[0])
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(1);

    const titles = moviesAtEnd.map(movie => movie.title);
    expect(titles).toContain(movies[0].title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
