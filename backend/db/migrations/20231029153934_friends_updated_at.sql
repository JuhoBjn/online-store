-- migrate:up
ALTER TABLE friends
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- migrate:down
ALTER TABLE friends DROP COLUMN updated_at;