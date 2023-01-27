const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Movie = require('../models/movie');
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
    it('fails if movie already in users list', async () => {
      await api.post('/api/movies').send(movies[0]).set(headers).expect(201);

      await api.post('/api/movies').send(movies[0]).set(headers).expect(400);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(1);
    });
  });

  describe('deletion of movie', () => {
    beforeEach(async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);
    });
    it('deletes movie', async () => {
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
      const moviesAtStart = await helper.moviesInDb();
      const movieToDelete = moviesAtStart.find(
        movie => movie.title === movies[1].title
      );
      await api.delete(`/api/movies/${movieToDelete.id}`).expect(401);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(1);
    });

    it('fails to delete movie does not belong to user', async () => {
      const newUser = {
        firstName: 'test',
        lastName: 'tester',
        email: 'test@new.com',
        password: '123456',
      };
      await api.post('/api/users').send(newUser);
      const login = await api
        .post('/api/login')
        .send({ email: 'test@new.com', password: '123456' });
      const newHeaders = { Authorization: `bearer ${login.body.token}` };
      await api.post('/api/movies').send(movies[0]).set(newHeaders).expect(201);

      const moviesinDB = await helper.moviesInDb();
      const { id } = moviesinDB.find(m => m.title === movies[0].title);

      await api.delete(`/api/movies/${id}`).set(headers).expect(401);

      const moviesAtEnd = await helper.moviesInDb();
      expect(moviesAtEnd).toHaveLength(2);
    });
  });
  describe('update movie', () => {
    beforeEach(async () => {
      await api.post('/api/movies').send(movies[1]).set(headers).expect(201);
    });
    it('updates watched status', async () => {
      const moviesinDB = await helper.moviesInDb();

      const { id } = moviesinDB.find(m => m.title === movies[1].title);

      await api
        .put(`/api/movies/${id}`)
        .send({ watched: true })
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const moviesAtEnd = await helper.moviesInDb();
      const { watched } = moviesAtEnd.find(m => m.title === movies[1].title);
      expect(watched).toBe(true);
    });
    it('updates rating', async () => {
      const moviesinDB = await helper.moviesInDb();

      const { id } = moviesinDB.find(m => m.title === movies[1].title);

      await api
        .put(`/api/movies/${id}`)
        .send({ rating: 8 })
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const moviesAtEnd = await helper.moviesInDb();
      const { rating } = moviesAtEnd.find(m => m.title === movies[1].title);
      expect(rating).toBe(8);
    });

    it('fails to update if no token', async () => {
      const moviesinDB = await helper.moviesInDb();
      const { id } = moviesinDB.find(m => m.title === movies[1].title);

      await api.put(`/api/movies/${id}`).send({ watched: true }).expect(401);
    });

    it('fails to update if movie does not belong to user', async () => {
      const newUser = {
        firstName: 'test',
        lastName: 'tester',
        email: 'test@new.com',
        password: '123456',
      };
      await api.post('/api/users').send(newUser);
      const login = await api
        .post('/api/login')
        .send({ email: 'test@new.com', password: '123456' });
      const newHeaders = { Authorization: `bearer ${login.body.token}` };
      await api.post('/api/movies').send(movies[0]).set(newHeaders).expect(201);

      const moviesinDB = await helper.moviesInDb();
      const { id } = moviesinDB.find(m => m.title === movies[0].title);
      await api
        .put(`/api/movies/${id}`)
        .send({ watched: true })
        .set(headers)
        .expect(401);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
