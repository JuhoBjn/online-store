-- migrate:up
CREATE TABLE `friend_requests` (
    `id` int NOT NULL AUTO_INCREMENT,
    `requester_user_id` varchar(36) NOT NULL,
    `requested_friend_user_id` varchar(36) NOT NULL,
    `is_accepted` tinyint(1) NOT NULL DEFAULT '0',
    `is_rejected` tinyint(1) NOT NULL DEFAULT '0',
    `request_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `requester_user_id` (`requester_user_id`),
    KEY `requested_friend_user_id` (`requested_friend_user_id`)
);

ALTER TABLE `friend_requests`
ADD FOREIGN KEY (`requester_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `friend_requests`
ADD FOREIGN KEY (`requested_friend_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE `friend_requests`;