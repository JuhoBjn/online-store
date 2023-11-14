-- migrate:up
ALTER TABLE users
ADD COLUMN email_hash VARCHAR(64) GENERATED ALWAYS AS (SHA2(LOWER(TRIM(email)), 256)) STORED;

-- migrate:down
ALTER TABLE users DROP COLUMN email_hash;