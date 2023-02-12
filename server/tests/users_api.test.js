const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany([
    {
      name: 'ivo tester',
      email: 'tester@test.com',
      passwordHash: '123456',
    },
  ]);
}, 10000);


describe('addition of new user', () => {
  it('adds new user', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'tester@email.com',
        password: '123456',
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
      })
      .expect(400)
      .expect({ error: 'email tester@test.com already taken' });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });

  it('fails with status code 400 if name > 12 characters ', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'reallylongname',
        lastName: 'reallylonglastname',
        email: 'tester@newemail.com',
        password: '1234567',
      })
      .expect(400)
      .expect({ error: 'name cannot be more than 12 characters long' });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });
  it('fails if email format not valid', async () => {
    await api
      .post('/api/users')
      .send({
        firstName: 'name',
        lastName: 'name',
        email: 'tester@newemail',
        password: '1234567',
      })
      .expect(400)
      .expect({ error: 'please enter a valid email' });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);
  });

  describe('login', () => {
    it('logs in user', async () => {
      await api
        .post('/api/users')
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'tester@email.com',
          password: '123456',
        })
        .expect(201);
      const loggedInUser = await api
        .post('/api/login')
        .send({
          email: 'tester@email.com',
          password: '123456',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(loggedInUser.body).toHaveProperty('token');
    });
    it('fails with 401 if email or password invalid', async () => {
      await api
        .post('/api/login')
        .send({
          email: 'tester@gmail.com',
          password: '123456',
        })
        .expect(401)
        .expect({ error: 'user with email tester@gmail.com does not exist' });
      await api
        .post('/api/login')
        .send({
          email: 'tester@test.com',
          password: '123456',
        })
        .expect(401)
        .expect({ error: 'invalid password' });
    });
  });

  describe('user details', () => {
    let headers;
    let user;
    beforeEach(async () => {
      await api.post('/api/users').send({
        firstName: 'test',
        lastName: 'test',
        email: 'tester@email.com',
        password: '123456',
      });
      const login = await api
        .post('/api/login')
        .send({ email: 'tester@email.com', password: '123456' });
      headers = { Authorization: `bearer ${login.body.token}` };
      const users = await helper.usersInDb();
      user = users.find(u => u.email === 'tester@email.com');
    });

    it('returns user', async () => {
      await api
        .get(`/api/users/${user.id}`)
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    it('fails if token missing', async () => {
      await api
        .get(`/api/users/${user.id}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });
    it('fails if ids do not match', async () => {
      await api
        .get('/api/users/123456')
        .set(headers)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
