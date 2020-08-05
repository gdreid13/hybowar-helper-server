const path = require('path')
const express = require('express')
const CharactersService = require('./characters-service')
const { requireAuth } = require('../auth/basic-auth')

const charactersRouter = express.Router()
const jsonBodyParser = express.json()

charactersRouter
  .get('/:userId/:positionId', (req, res, next) => {
    CharactersService.getAllCharacters(req.app.get('db')('hybowar_characters'))
      .then(characters => {
        res.json(characters.map(char => {
          return { 
            character_name: char.character_name,
            character_id: char.character_id,
            status: char.status,
            age: char.age,
            location: char.location,
            personal_combat: char.personal_combat,
            diplomacy: char.diplomacy,
            rulership: char.rulership,
            military_command: char.military_command,
            heroism: char.heroism,
            intrigue: char.intrigue,
            magic: char.magic,
          }
        }))
      })
      .catch(next);
    })

    .post('/:userId/:positionId', jsonBodyParser, (req, res, next) => {
      const {
        character_name,
        character_id,
        status,
        age,
        location,
        personal_combat,
        diplomacy,
        rulership,
        military_command,
        heroism,
        intrigue,
        magic,
        position_id
      } = req.body
      const newCharacter = {
        character_name,
        character_id,
        status,
        age,
        location,
        personal_combat,
        diplomacy,
        rulership,
        military_command,
        heroism,
        intrigue,
        magic,
        position_id
      }

      for (const [key, value] of Object.entries(newCharacter))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

      CharactersService.insertCharacter(
        req.app.get('db'),
        newCharacter
      )
      .then(character => {
        res
          .status(201)
          .json(character)
      })
      .catch(next)
    })

  module.exports = charactersRouter