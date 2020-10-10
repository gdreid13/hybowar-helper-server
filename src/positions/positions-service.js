const PositionsService = {
  getPositionsByUser(db, userId) {
  return db
    .from('hybowar_positions AS pos')
    .where('user_id', userId)
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
  },

  deletePosition(db, positionId) {
    return db
      .where({ positionId })
      .delete()
  },

  updatePosition(db, positionId, newPositionFields) {
    return db
      .where({ positionId })
      .update(newPositionFields)
  }
  
}

module.exports = PositionsService
