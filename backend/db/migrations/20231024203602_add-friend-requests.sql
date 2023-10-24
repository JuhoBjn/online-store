-- migrate:up
CREATE TABLE `friend_requests` (
    `id` int NOT NULL AUTO_INCREMENT,
    `requester_user_id` varchar(36) NOT NULL,
    `requested_friend_user_id` varchar(36) NOT NULL,
    `is_accepted` tinyint(1) NOT NULL DEFAULT '0',
    `is_rejected` tinyint(1) NOT NULL DEFAULT '0',
    `request_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `requested_friend_user_id` (`requested_friend_user_id`),
    KEY `requester_user_id` (`requester_user_id`)
)

-- migrate:down
DROP TABLE `friend_requests`;