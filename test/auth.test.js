const knex = require('knex')
const app = require('../src/app')
const jwt = require('jsonwebtoken')

describe('Auth routes:', () => {
  let db;
  let users = [
    {
      "id": 1,
      "user_name": "demo1",
      "password": "$2a$04$TSEdbiL4DhMOuJwlxEmBbuCOmUnuiaxXVXbvHdKFFd3hv4PJzQsd6",
      "date_created": "2020-10-01"
    },
    {
      "id": 2,
      "user_name": "demo2",
      "password": "$2a$04$TSEdbiL4DhMOuJwlxEmBbuCOmUnuiaxXVXbvHdKFFd3hv4PJzQsd6",
      "date_created": "2020-10-01"
    },
    {
      "id": 3,
      "user_name": "demo3",
      "password": "$2a$12$hQz1YZntW/MH8lfL5wnKDu8kE40vAusB/z7lVrKpJuzV9hkjfNYwu",
      "date_created": "2020-10-01"
    }
  ];
  

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  });

  before('cleanup', () => db.raw(
    'TRUNCATE TABLE hybowar_users, hybowar_positions, hybowar_characters RESTART IDENTITY CASCADE;'
  ));

  afterEach('cleanup', () => db.raw(
    'TRUNCATE TABLE hybowar_users, hybowar_positions, hybowar_characters RESTART IDENTITY CASCADE;'
  ));

  after('disconnect from the database', () => db.destroy());

  describe('POST /api/users', () => {
    it('should allow a user to register with status 201', () => {

      const newUser = {
        'user_name': 'demo4',
        'password': 'Ji!Indur-04'
      };

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'user_name', 'date_created');
          expect(res.body.user_name).to.equal(newUser.user_name);
        })
    })
  })
})