const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const jokes = require('../api/jokes/jokes-data');

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  describe('[POST] /api/auth/register', () => {
    it('[1] repsonds with the correct object on successful register', async () => {
      const res = await request(server).post('/api/auth/register').send({ username: 'test', password: 'test'})
      expect(res.body).toMatchObject({"id": 1, "username": "test"})
    }, 750)

    it('[2] repsonds with the correct message when field is missing', async () => {
      const res = await request(server).post('/api/auth/register').send({ username: 'test'})
      expect(res.body.message).toBe('username and password required')
    }, 750)
  });

  describe('[POST] /api/auth/login', () => {
    it('[3] Responds with correct message on successful login', async () => {
      let res = await request(server).post('/api/auth/register').send({ username: 'test', password: 'test' })
      res = await request(server).post('/api/auth/login').send({ username: 'test', password: 'test' })
      expect(res.body.message).toMatch(/welcome back test/i)
    }, 750)

    it('[4] Reponds with a correct status on invalid credentials', async () => {
      let res = await request(server).post('/api/auth/register').send({ username: 'test', password: 'test' })
      res = await request(server).post('/api/auth/login').send({ username: 'test'})
      expect(res.body.message).toMatch(/username and password required/i)
    }, 750)
  })

  describe('[GET] /api/jokes', () => {
    it('[5] Responds back with data if the user is authed', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'test' })
      let res = await request(server).post('/api/auth/login').send({ username: 'test', password: 'test' })
      res = await request(server).get('/api/jokes').set('Authorization', res.body.token);
      expect(res.body).toMatchObject(jokes);
    }, 750)

    it('[6] Responds back with error message if the user is not authed', async () => {
      let res = await request(server).get('/api/jokes');
      expect(res.body.message).toMatch(/token required/i)
    })
  })
})
