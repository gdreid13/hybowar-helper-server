const express = require('express')
const CharactersService = require('./characters-service')
const { requireAuth } = require('../auth/basic-auth')

const charactersRouter = express.Router()

charactersRouter
  .route('/:position')
  .all(requireAuth)
  .get((req, res, next) => {
    CharactersService.getAllCharacters(req.app.get('db'))
      .then(things => {
        res.json(CharactersService.serializeCharacters(characters))
      })
      .catch(next)
  })

  .route('/:position/:character_id')
  .all(requireAuth)
  .all(checkCharacterExists)
  .get((req, res) => {
    res.json(CharactersService.serializeCharacters(res.character))
  })

  module.exports = charactersRouter

