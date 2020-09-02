const xss = require('xss')

const PositionsService = {
  getPositions(db) {
  return db
    .from('hybowar_positions AS pos')
    .select(
      'pos.id',
      'pos.game_number',
      'pos.nation',
      'pos.user_id'
    )
    .groupBy('pos.id')
  },

  insertPosition(db, newPosition) {
    return db
      .insert(newPosition)
      .into('hybowar_positions')
  }
}

module.exports = PositionsService
