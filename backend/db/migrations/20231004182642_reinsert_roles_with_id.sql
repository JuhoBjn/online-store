-- migrate:up
DELETE FROM `roles`;

INSERT INTO `roles`(`id`, `name`) VALUES (1, 'user'), (2, 'caretaker'), (3, 'admin');

-- migrate:down

DELETE FROM `roles`;

INSERT INTO `roles`(`name`) VALUES ('user'), ('caretaker'), ('admin');