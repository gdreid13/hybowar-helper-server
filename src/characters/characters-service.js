const xss = require('xss')
const knex = require('knex')

const CharactersService = {
  getCharactersByPos(db, positionId) {
  return db
    .from('hybowar_characters AS char')
    .where('position_id', positionId)
    .select(
      'char.id',
      'char.character_name',
      'char.character_id',
      'char.status',
      'char.age',
      'char.location',
      'char.personal_combat',
      'char.diplomacy',
      'char.rulership',
      'char.military_command',
      'char.heroism',
      'char.intrigue',
      'char.magic',
      'char.position_id'
    )
    .groupBy('char.id')
  },

  insertCharacter(db, newCharacter) {
    return db
    .insert(newCharacter)
    .into('hybowar_characters')
  },

  updateCharacter(knex, id, newCharacterFields) {
    return knex('hybowar_characters')
      .where({ id })
      .update(newCharacterFields)
  },
}

module.exports = CharactersService