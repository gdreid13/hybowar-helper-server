const xss = require('xss')

const CharactersService = {
  getAllCharacters(db) {
  return db
    .from('hybowar_characters AS char')
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
  }
}

module.exports = CharactersService