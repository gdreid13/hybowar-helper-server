require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE.ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL
}