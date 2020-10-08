BEGIN;

TRUNCATE
  hybowar_users,
  hybowar_positions,
  hybowar_characters
  RESTART IDENTITY CASCADE;

INSERT INTO hybowar_users (user_name, password)
VALUES
  ('demo', '$2a$04$TSEdbiL4DhMOuJwlxEmBbuCOmUnuiaxXVXbvHdKFFd3hv4PJzQsd6'),
  ('thatguy', '$2a$04$TSEdbiL4DhMOuJwlxEmBbuCOmUnuiaxXVXbvHdKFFd3hv4PJzQsd6');

INSERT INTO hybowar_positions (game_number, nation, user_id)
VALUES
  ('958', 'Border Kingdom', '1'),
  ('958', 'Pictland', '2');

INSERT INTO hybowar_characters (
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
  )
VALUES (
  'Rhon Gondlen',
  'BORD-1',
  'alive',
  'young adult',
  'The Lowland Fiefs',
  'NONE',
  'GOOD',
  'SUPERIOR',
  'NONE',
  'POOR',
  'GOOD',
  'NONE',
  '1'
  ),
  ('Poin Nandlea',
  'BORD-2',
  'alive',
  'prime of life',
  'Virunian',
  'SUPERIOR',
  'ADEQUATE',
  'SUPERIOR',
  'NONE',
  'GOOD',
  'NONE',
  'NONE',
  '1'
  ),
  ('Chief Jhebbal Sag',
  'PICT-1',
  'alive',
  'prime of life',
  'Eagle',
  'GOOD',
  'ADEQUATE',
  'ADEQUATE',
  'POOR',
  'SUPERIOR',
  'NONE',
  'NONE',
  '2'
  );


COMMIT;