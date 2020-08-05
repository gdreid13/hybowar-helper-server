CREATE TABLE hybowar_positions (
  id SERIAL PRIMARY KEY,
  game_number INTEGER NOT NULL,
  nation TEXT NOT NULL,
  user_id INTEGER
    REFERENCES hybowar_users(id) ON DELETE CASCADE NOT NULL
)