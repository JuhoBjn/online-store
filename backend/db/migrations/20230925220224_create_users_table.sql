-- migrate:up
CREATE TABLE `users` (
  `id` VARCHAR(36) NOT NULL,
  `first_name` VARCHAR(20),
  `last_name` VARCHAR(30),
  `email` VARCHAR(320) NOT NULL,
  `postal_code` VARCHAR(5),
  `city` VARCHAR(85),
  `country` VARCHAR(2),
  `last_location_latitude` DECIMAL(8, 6),
  `last_location_longitude` DECIMAL(9, 6),
  `phone` VARCHAR(15),
  `password` VARCHAR(60) NOT NULL,
  `premium` BOOLEAN DEFAULT FALSE,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

-- migrate:down
DROP TABLE users;