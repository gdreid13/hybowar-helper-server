module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/hybowar-helper',
  // TEST_DATABASE_URL: process.env.TEST.DATABASE_URL || 'postgresql://postgres@localhost/hybowar-helper-test',
  JWT_SECRET: process.env.JWT_SECRET || 'not-so-secret',
  CLIENT_ORIGIN: 'https://hybowar-client.vercel.app'
}