const knex = require('knex')
const app = require('../src/app')
const jwt = require('jsonwebtoken')

describe('Hyborian War Helper API:', function () {
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
  let positions = [
    {
      "id": 1,
      "game_number": "958",
      "nation": "Border Kingdom",
      "user_id": 1
    },
    {
      "id": 2,
      "game_number": "958",
      "nation": "Pictland",
      "user_id": 2
    },
    {
      "id": 3,
      "game_number": "1012",
      "nation": "Aquilonia",
      "user_id": 1
    }
  ];
  let characters = [
    {
      "id": 1,
      "character_name": "Rhon Gondlen",
      "character_id": "BORD-1",
      "status": "alive",
      "age": "young adult",
      "location": "The Lowland Fiefs",
      "personal_combat": "NONE",
      "diplomacy": "GOOD",
      "rulership": "SUPERIOR",
      "military_command": "NONE",
      "heroism": "POOR",
      "intrigue": "GOOD",
      "magic": "NONE",
      "position_id": 1
    },
    {
      "id": 2,
      "character_name": "Poin Nandlea",
      "character_id": "BORD-2",
      "status": "alive",
      "age": "prime of life",
      "location": "Virunian",
      "personal_combat": "SUPERIOR",
      "diplomacy": "ADEQUATE",
      "rulership": "SUPERIOR",
      "military_command": "NONE",
      "heroism": "GOOD",
      "intrigue": "NONE",
      "magic": "NONE",
      "position_id": 1
    },
    {
      "id": 3,
      "character_name": "Chief Jhebbal Sag",
      "character_id": "PICT-1",
      "status": "alive",
      "age": "prime of life",
      "location": "Eagle",
      "personal_combat": "GOOD",
      "diplomacy": "ADEQUATE",
      "rulership": "ADEQUATE",
      "military_command": "POOR",
      "heroism": "SUPERIOR",
      "intrigue": "NONE",
      "magic": "NONE",
      "position_id": 2
    }
  ]

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

  describe('GET /api/positions/:userId', () => {
    beforeEach('insert some users', () => {
      return db('hybowar_users').insert(users);
    })
    beforeEach('insert some positions', () => {
      return db('hybowar_positions').insert(positions);
    })

    it('should return an array of positions for that user id', () => {
      const userId = 1
      const user = {
        'user_name': 'demo1',
        'password': 'password'
      }
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        subject: user.user_name,
        algorithm: 'HS256',
      })
      return supertest(app)
        .get(`/api/positions/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(res => {
          expect(res.body).to.be.a('array');
          res.body.forEach((position) => {
            expect(position).to.be.a('object');
            expect(position).to.include.keys('id', 'game_number', 'nation', 'user_id')
          })
        })
    })
  })

  describe('POST /api/positions/:userId', () => {
    beforeEach('insert some users', () => {
      return db('hybowar_users').insert(users);
    })

    it('should allow the user to post with a status 201', () => {
      const newPosition = {
        'game_number': 999,
        'nation': 'Nemedia',
        'user_id': 1
      };
      const userId = 1
      const user = {
        'user_name': 'demo1',
        'password': 'password'
      }
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        subject: user.user_name,
        algorithm: 'HS256',
      })
      return supertest(app)
        .post(`/api/positions/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPosition)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'game_number', 'nation', 'user_id');
          expect(res.body.game_number).to.equal(newPosition.game_number);
          expect(res.body.nation).to.equal(newPosition.nation);
          expect(res.body.user_id).to.equal(newPosition.user_id);
        })
    })
  })

  describe('GET /api/characters/:userId/:positionId', () => {
    beforeEach('insert some users', () => {
      return db('hybowar_users').insert(users);
    })
    beforeEach('insert some positions', () => {
      return db('hybowar_positions').insert(positions);
    })
    beforeEach('insert some characters', () => {
      return db('hybowar_characters').insert(characters);
    })

    it('should allow the user to get an array of characters by user and position', () => {
      const positionId = 1
      const userId = 1
      const user = {
        'user_name': 'demo1',
        'password': 'password'
      }
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        subject: user.user_name,
        algorithm: 'HS256',
      })
      return supertest(app)
        .get(`/api/characters/${userId}/${positionId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(res => {
          expect(res.body).to.be.a('array');
          res.body.forEach((character) => {
            expect(character).to.be.a('object');
            expect(character).to.include.keys(
              'character_name',
              'character_id',
              'status',
              'age',
              'location',
              'personal_combat',
              'diplomacy',
              'rulership',
              'military_command',
              'heroism',
              'intrigue',
              'magic',
            )
          })
        })
    })
  })

  describe('POST /api/characters/:userId/:positionId', () => {
    beforeEach('insert some users', () => {
      return db('hybowar_users').insert(users);
    })
    beforeEach('insert some positions', () => {
      return db('hybowar_positions').insert(positions);
    })
    it('should allow the user to post with a status 201', () => {
      const newCharacter = {
        'character_name': 'Nikus Sculvo',
        'character_id': 'BORD-5',
        'status': 'alive',
        'age': 'old',
        'location': 'Virunian',
        'personal_combat': 'SUPERIOR',
        'diplomacy': 'NONE',
        'rulership': 'POOR',
        'military_command': 'ADEQUATE',
        'heroism': 'POOR',
        'intrigue': 'POOR',
        'magic': 'NONE',
        'position_id': 1
      }
      const positionId = 1
      const userId = 1
      const user = {
        'user_name': 'demo1',
        'password': 'password'
      }
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        subject: user.user_name,
        algorithm: 'HS256',
      })
      return supertest(app)
        .post(`/api/characters/${userId}/${positionId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newCharacter)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'character_name',
            'character_id',
            'status',
            'age',
            'location',
            'personal_combat',
            'diplomacy',
            'rulership',
            'military_command',
            'heroism',
            'intrigue',
            'magic',
            'position_id'
          )
          expect(res.body.character_name).to.equal(newCharacter.character_name)
          expect(res.body.character_id).to.equal(newCharacter.character_id)
          expect(res.body.status).to.equal(newCharacter.status)
          expect(res.body.age).to.equal(newCharacter.age)
          expect(res.body.location).to.equal(newCharacter.location)
          expect(res.body.personal_combat).to.equal(newCharacter.personal_combat)
          expect(res.body.diplomacy).to.equal(newCharacter.diplomacy)
          expect(res.body.rulership).to.equal(newCharacter.rulership)
          expect(res.body.military_command).to.equal(newCharacter.military_command)
          expect(res.body.heroism).to.equal(newCharacter.heroism)
          expect(res.body.intrigue).to.equal(newCharacter.intrigue)
          expect(res.body.magic).to.equal(newCharacter.magic)
          expect(res.body.position_id).to.equal(newCharacter.position_id)
        })
    })
  })

  describe('PATCH /api/characters/:userId/:positionId', () => {
    beforeEach('insert some users', () => {
      return db('hybowar_users').insert(users);
    })
    beforeEach('insert some positions', () => {
      return db('hybowar_positions').insert(positions);
    })
    beforeEach('insert some characters', () => {
      return db('hybowar_characters').insert(characters);
    })
    // access to this endpoint is not yet implemented client-side, will test if enabled
  })

})