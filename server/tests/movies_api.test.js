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

  describe('addition of movie', () => {
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
    it('fails if token not provided', async () => {
      await api.post('/api/movies').send(movies[1]).expect(401);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(0);
    });
  });

  describe('movie list', () => {
    it('returns movie list for user', async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);

      const movieList = await api.get('/api/movies/list').set(headers);
      expect(movieList.body).toHaveLength(1);
      const titles = movieList.body.map(movie => movie.title);
      expect(titles).toContain(movies[1].title);
    });
    it('fails if token missing', async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);
      await api.get('/api/movies/list').expect(404);
    });
    it('fails if token invalid', async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);
      await api
        .get('/api/movies/list')
        .set({
          Authorization: 'bearer invalidToken123',
        })
        .expect(401);
    });
  });

  describe('deletion of movie', () => {
    it('deletes movie', async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);

      const moviesAtStart = await helper.moviesInDb();
      const movieToDelete = moviesAtStart.find(
        movie => movie.title === movies[1].title
      );
      await api
        .delete(`/api/movies/${movieToDelete.id}`)
        .set(headers)
        .expect(204);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(0);
    });
    it('fails to delete if no token', async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);

      const moviesAtStart = await helper.moviesInDb();
      const movieToDelete = moviesAtStart.find(
        movie => movie.title === movies[1].title
      );
      await api.delete(`/api/movies/${movieToDelete.id}`).expect(401);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(1);
    });

    it('fails to delete movie does not belong to user', async () => {
      await Movie.insertMany([movies[1]]);
      const moviesAtStart = await helper.moviesInDb();
      const movieToDelete = moviesAtStart.find(
        movie => movie.title === movies[1].title
      );
      await api.delete(`/api/movies/${movieToDelete.id}`).expect(401);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(1);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
