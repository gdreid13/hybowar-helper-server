module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_BASE_URL: (process.env.NODE_ENV == 'development')
    ? "http://localhost:3000"
    : process.env.REACT_APP_API_BASE_URL || 'https://shrouded-hamlet-24502.herokuapp.com/',
  DATABASE_URL: (process.env.NODE_ENV == 'development')
    ? process.env.LOCAL_DATABASE_URL || 'postgresql://postgres@localhost/hybowar-helper'
    : process.env.DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST.DATABASE_URL || 'postgresql://postgres@localhost/hybowar-helper-test',
  JWT_SECRET: process.env.JWT_SECRET || 'not-so-secret',

}