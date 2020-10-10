const express = require('express')
const PositionsService = require('./positions-service')
const { requireAuth } = require('../auth/jwt-auth')
const xss = require('xss')

const positionsRouter = express.Router()
const jsonBodyParser = express.json()

const serializePosition = position => ({
  id: position.id,
  game_number: position.game_number,
  nation: xss(position.nation),
  user_id: position.user_id
})

positionsRouter
  .get('/:userId', requireAuth, (req, res, next) => {
    const userId = req.params.userId
    PositionsService.getPositionsByUser(
      req.app.get('db')('hybowar_positions'),
      userId
      )
      .then(positions => {
        console.log(positions)
        res.json(positions.map(serializePosition))
      })
      .catch(next);
  })
  .post('/:userId', requireAuth, jsonBodyParser, (req, res, next) => {
    const { game_number, nation, user_id } = req.body
    const newPosition = { game_number, nation, user_id }

    for (const [key, value] of Object.entries(newPosition))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    PositionsService.insertPosition(
      req.app.get('db'),
      newPosition
    )
      .then(position => {
        res
          .status(201)
          .json(position)


      })
      .catch(next)
  })

module.exports = positionsRouter