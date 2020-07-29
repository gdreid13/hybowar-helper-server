BEGIN;

TRUNCATE
  hybowar_users,
  hybowar_games,
  hybowar_characters
  RESTART IDENTIY CASCADE;