CREATE TABLE hybowar_characters (
  id SERIAL PRIMARY KEY,
  character_name TEXT NOT NULL,
  character_id TEXT NOT NULL,
  status TEXT NOT NULL,
  age TEXT NOT NULL,
  location TEXT NOT NULL,
  personal_combat TEXT NOT NULL,
  diplomacy TEXT NOT NULL,
  rulership TEXT NOT NULL,
  military_command TEXT NOT NULL,
  heroism TEXT NOT NULL,
  intrigue TEXT NOT NULL,
  magic TEXT NOT NULL,
  position_id INTEGER
    REFERENCES hybowar_positions(id) ON DELETE CASCADE NOT NULL
)