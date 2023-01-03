const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
//const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany([
    {
      name: 'ivo',
      username: 'tester',
      passwordHash: '123456',
    },
  ]);
});

describe('users', () => {
  it('returns users as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('returns correct amount of users', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(1);
  });
});

describe('addition of new user', () => {
  it('adds new user', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'testUser',
        username: 'tester2',
        password: '123456',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(2);
    expect(usersAtEnd[1].name).toBe('testUser');
  });

  it('fails with status code 400 if missing password or username', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'testUserFail',
      })
      .expect(400)
      .expect({
        error: 'username or password missing',
      });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });

  it('fails with status code 400 if password < 6 characters', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'testUser',
        username: 'tester2',
        password: '123',
      })
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });

  it('fails with status code 400 if username taken', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'testUser',
        username: 'tester',
        password: '1234567',
      })
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
