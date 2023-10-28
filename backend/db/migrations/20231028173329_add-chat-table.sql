-- migrate:up
CREATE TABLE `chats` (
  `chat_id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('direct', 'group') NOT NULL,
  `name` VARCHAR(32) NOT NULL DEFAULT 'New chat',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_message_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`)
);

CREATE TABLE `messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `chat_id` INT NOT NULL,
  `sender` VARCHAR(36) NOT NULL,
  `message` TEXT NOT NULL,
  `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`chat_id`) REFERENCES `chats`(`chat_id`) ON DELETE CASCADE
);

ALTER TABLE `friends` ADD COLUMN `chat_id` INT;

ALTER TABLE `friends` ADD CONSTRAINT `fk_friends_chats`
  FOREIGN KEY (`chat_id`) 
  REFERENCES `chats`(`chat_id`) ON DELETE CASCADE;

-- migrate:down
ALTER TABLE `friends` DROP FOREIGN KEY `fk_friends_chats`;
ALTER TABLE `friends` DROP COLUMN `chat_id`;
DROP TABLE `messages`;
DROP TABLE `chats`;
