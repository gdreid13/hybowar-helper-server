module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/hybowar-helper',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/hybowar-helper-test',
  JWT_SECRET: process.env.JWT_SECRET || 'not-so-secret',
  CLIENT_ORIGIN: 
  // 'https://hybowar-client.vercel.app'
  'http://localhost:3000'
}