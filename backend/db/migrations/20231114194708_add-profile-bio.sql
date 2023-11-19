-- migrate:up
ALTER TABLE `users` ADD COLUMN `bio` varchar(400);

-- migrate:down
ALTER TABLE `users` DROP COLUMN `bio`;
