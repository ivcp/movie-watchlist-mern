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
      name: 'ivo perovic',
      email: 'tester@test.com',
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
        firstName: 'test',
        lastName: 'test',
        email: 'tester@email.com',
        password: '123456',
        confirmPassword: '123456',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(2);
    expect(usersAtEnd[1].name).toBe('test test');
  });

  it('fails with status code 400 if missing password, email username', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'testUserFail',
      })
      .expect(400)
      .expect({
        error: 'name, password or email missing',
      });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });

  it('fails with status code 400 if password < 6 characters', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'testUser',
        lastName: 'test',
        email: 'tester2@mail.me',
        password: '123',
        confirmPassword: '123',
      })
      .expect(400)
      .expect({ error: 'password must be at least 6 characters long' });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });

  it('fails with status code 400 if email taken', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'testUser',
        lastName: 'test',
        email: 'tester@test.com',
        password: '1234567',
        confirmPassword: '1234567',
      })
      .expect(400)
      .expect({ error: 'user already exists' });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });
  it('fails with status code 400 paswords dont match', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'testUser',
        lastName: 'test',
        email: 'tester1@test.com',
        password: '1234567',
        confirmPassword: '123456',
      })
      .expect(400)
      .expect({ error: 'passwords do not match' });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
