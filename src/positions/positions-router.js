const path = require('path')
const express = require('express')
const PositionsService = require('./positions-service')
const { requireAuth } = require('../auth/jwt-auth')

const positionsRouter = express.Router()
const jsonBodyParser = express.json()

positionsRouter
  .get('/:userId', requireAuth, (req, res, next) => {
    PositionsService.getPositions(req.app.get('db')('hybowar_positions'))
      .then(positions => {
        res.json(positions.map(position => {
          return {
            position_id: position.id,
            game_number: position.game_number,
            nation: position.nation
          }
        }))
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