-- migrate:up
CREATE TABLE `friends` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` varchar(36) NOT NULL,
    `friend_user_id` varchar(36) NOT NULL,
    `became_friends_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_unfriended` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id_friend_user_id` (`user_id`, `friend_user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`friend_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `friends`;