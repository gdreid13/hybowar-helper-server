const xss = require('xss')

const PositionsService = {
  getAllPositions(db) {
  return db
    .from('hybowar_positions AS pos')
    .select(
      'pos.id',
      'pos.game_number',
      'pos.position',
      'pos.user_id'
    )
    .groupBy('pos.id')
  },
}

module.exports = PositionsService
