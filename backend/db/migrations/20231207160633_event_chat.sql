-- migrate:up
ALTER TABLE events
ADD COLUMN chat_id VARCHAR(36) NULL,
    ADD CONSTRAINT `fk_event_chat` FOREIGN KEY (chat_id) REFERENCES chats (chat_id) ON DELETE CASCADE;

-- migrate:down
ALTER TABLE events DROP FOREIGN KEY fk_event_chat,
    DROP COLUMN chat_id;