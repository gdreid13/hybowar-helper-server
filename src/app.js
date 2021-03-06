require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const positionsRouter = require('./positions/positions-router')
const charactersRouter = require('./characters/characters-router')
const { CLIENT_ORIGIN } = require('./config');

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/positions', positionsRouter)
app.use('/api/characters', charactersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})



app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    // response = { error: { message: 'server error' } } 
    // leaving this code in place while diagnosing issue
    console.error(error)
    response = { message: error.message, error }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app