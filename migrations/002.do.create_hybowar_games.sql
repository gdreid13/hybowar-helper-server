CREATE TABLE hybowar_games (
  id SERIAL PRIMARY KEY,
  game_number INTEGER NOT NULL,
  position_number INTEGER NOT NULL,
  user_id INTEGER
    REFERENCES hybowar_users(id) ON DELETE CASCADE NOT NULL
)