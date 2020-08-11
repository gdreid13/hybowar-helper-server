BEGIN;

TRUNCATE
  hybowar_users,
  hybowar_positions,
  hybowar_characters
  RESTART IDENTITY CASCADE;

INSERT INTO hybowar_users (user_name, password)
VALUES
  ('thisguy', '$2a$12$BnbDYs5pHF.KBLs6SHkrv.g0AryqPd189JlyluNkVhqn2C.zhfDWi'),
  ('thatguy', '$2a$12$QiHiTiuTVDt./YQWPO/7W.Ku4SB6Wvf4z7N9m.0HD6y0IoHPJINqC');

INSERT INTO hybowar_positions (game_number, nation, user_id)
VALUES
  ('958', 'Border Kingdom', '1');

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
  'Virunian',
  'NONE',
  'GOOD',
  'SUPERIOR',
  'NONE',
  'POOR',
  'GOOD',
  'NONE',
  '1'
  );

COMMIT;