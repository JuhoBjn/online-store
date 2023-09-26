-- migrate:up
CREATE TABLE `roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `roles`(`name`) VALUES ('user'),('caretaker'),('admin');

ALTER TABLE `users` RENAME COLUMN `name` TO `first_name`;

ALTER TABLE `users` ADD COLUMN `last_name` VARCHAR(20) DEFAULT NULL;

ALTER TABLE `users` ADD COLUMN `role_id` INT NOT NULL;

ALTER TABLE `users`
ADD CONSTRAINT `fk_users_roles_idx`
  FOREIGN KEY (`role_id`)
  REFERENCES `roles`(`id`);

-- migrate:down
ALTER TABLE `users` REMOVE CONSTRAINT `fk_users_roles_idx`;
DROP TABLE `roles`;
