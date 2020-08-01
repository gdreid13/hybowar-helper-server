const path = require('path')
const express = require('express')
const PositionsService = require('./positions-service')

const positionsRouter = express.Router()

positionsRouter
  .get('/:userId', (req, res, next) => {
    PositionsService.getAllPositions(req.app.get('db')('hybowar_positions'))
      .then(positions => {
        console.log('positions are:' + JSON.stringify(positions))
        res.json(positions.map(position => {
          return { 
            game_number: position.game_number,
            position: position.position
          }
        }))
      })
      .catch(next);
  })

module.exports = positionsRouter