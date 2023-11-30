-- Insert test data into the database
-- Users table
-- Regular premium user. Password: Lotta12345
INSERT INTO `users`(
        `id`,
        `first_name`,
        `last_name`,
        `bio`,
        `email`,
        `postal_code`,
        `city`,
        `country`,
        `phone`,
        `password`,
        `premium`,
        `role_id`
    )
SELECT '858560f9-fc03-43b0-b931-01213e4787ce',
    'Lotta',
    'Schmiedmann',
    'This is the profile of Lotta Schmiedmann, a regular premium user of GoldenAge.',
    'lottas@test.com',
    '65300',
    'Vaasa',
    'fi',
    '2589631470',
    '$2y$12$RRPzbGc5Sxf8lunSTYZmeOZql12ifELndypkHIYrQmxcn7/HysLli',
    1,
    id
FROM `roles`
WHERE `name` = 'user';

-- Regular non-premium user. Password: Thomas12345
INSERT INTO `users`(
        `id`,
        `first_name`,
        `last_name`,
        `bio`,
        `email`,
        `postal_code`,
        `city`,
        `country`,
        `phone`,
        `password`,
        `premium`,
        `role_id`
    )
SELECT 'ddfffcd7-983c-4f83-b998-884c36bea194',
    'Thomas',
    'Tester',
    'This is the profile of Thomas Tester, a regular non-premium user of GoldenAge.',
    'thomast@test.com',
    '93800',
    'Kuusamo',
    'fi',
    '1234567890',
    '$2y$12$Dq3CBg6zOsoTcOgPz1KkP.uxF/q8YVxiaaBMBo1fWObOglYKm.u0y',
    0,
    id
FROM `roles`
WHERE `name` = 'user';

-- Caretaker, premium user. Password: Bob12345
INSERT INTO `users`(
        `id`,
        `first_name`,
        `last_name`,
        `bio`,
        `email`,
        `postal_code`,
        `city`,
        `country`,
        `phone`,
        `password`,
        `premium`,
        `role_id`
    )
SELECT '59158c35-8d77-43f1-bc63-3c5b4265b276',
    'Bob',
    'Builer',
    'This is the profile of Bob the Builder, a caretaker at GoldenAge with a premium account.',
    'bobb@test.com',
    '00100',
    'Helsinki',
    'fi',
    '9876543210',
    '$2y$12$/HKypYHzWXAVigx7tjXQiOvx2q54Oyzo.t/hgWoehm6xhrQFS1h5W',
    1,
    id
FROM `roles`
WHERE `name` = 'caretaker';

-- Caretaker, non-premium user. Password Larry12345
INSERT INTO `users`(
        `id`,
        `first_name`,
        `last_name`,
        `bio`,
        `email`,
        `postal_code`,
        `city`,
        `country`,
        `phone`,
        `password`,
        `premium`,
        `role_id`
    )
SELECT '239aec9f-066e-4e6a-88d7-9cdccd43445b',
    'Larry',
    'Smith',
    'This is the profile of Larry Smith, a caretaker at GoldenAge who does not have a premium account.',
    'larrys@test.com',
    '90100',
    'Oulu',
    'fi',
    '5293471805',
    '$2y$12$VXZym8v/XynBsSNzmP5zDu9yBdN3.iVR794eEgbfn7O3O.K/mWqly',
    0,
    id
FROM `roles`
WHERE `name` = 'caretaker';

-- Admin, premium user. Password: Anthony12345
INSERT INTO `users`(
        `id`,
        `first_name`,
        `last_name`,
        `bio`,
        `email`,
        `postal_code`,
        `city`,
        `country`,
        `phone`,
        `password`,
        `premium`,
        `role_id`
    )
SELECT 'e16a6eac-9993-4137-9221-7c879337bbe4',
    'Anthony',
    'Administrator',
    'This is the profile of Antony Administator, an admin at GoldenAge with a premium account.',
    'anthonya@test.com',
    '20500',
    'Turku',
    'fi',
    '1397824650',
    '$2y$12$DbW0B2qdDu/sJ0SSm/rVoOwDTC4qD8oowndeJ4v3v/YUO4iqq7fne',
    1,
    id
FROM `roles`
WHERE `name` = 'admin';

-- Admin, non-premium user. Password: testPassw0rd
INSERT INTO `users`(
        `id`,
        `first_name`,
        `last_name`,
        `bio`,
        `email`,
        `postal_code`,
        `city`,
        `country`,
        `phone`,
        `password`,
        `premium`,
        `role_id`
    )
SELECT '41284e8d-ee2b-4e15-b9af-296de2a9af8a',
    'Adam',
    'Administrator',
    'This is the profile of Adam Administrator, an admin at GoldenAge without a premium account.',
    'adama@test.com',
    '57710',
    'Savonlinna',
    'fi',
    '+358123456790',
    '$2a$12$GVly7eDkfYYbsJZTy9ug7.ZMLxgtXw7IcuVS2vMpG1UdnZq7mNvCq',
    0,
    id
FROM `roles`
WHERE `name` = 'admin';

-- Add a friendship between Lotta Schmiedmann and Larry Smith.
INSERT INTO `friends`(`user_id`, `friend_user_id`)
VALUES (
        '858560f9-fc03-43b0-b931-01213e4787ce',
        '239aec9f-066e-4e6a-88d7-9cdccd43445b'
    );

INSERT INTO `friends`(`user_id`, `friend_user_id`)
VALUES (
        '239aec9f-066e-4e6a-88d7-9cdccd43445b',
        '858560f9-fc03-43b0-b931-01213e4787ce'
    );

-- Add a friendship between Larry Smith and Bob Builder.

INSERT INTO `friends`(`user_id`, `friend_user_id`)
VALUES (
        '239aec9f-066e-4e6a-88d7-9cdccd43445b',
        '59158c35-8d77-43f1-bc63-3c5b4265b276'
    );

INSERT INTO `friends`(`user_id`, `friend_user_id`)
VALUES (
        '59158c35-8d77-43f1-bc63-3c5b4265b276',
        '239aec9f-066e-4e6a-88d7-9cdccd43445b'
    );

-- Make Larry Smith and Thomas Tester friends that have unfriended each other.
INSERT INTO `friends`(`user_id`, `friend_user_id`, `is_unfriended`)
VALUES (
        'ddfffcd7-983c-4f83-b998-884c36bea194',
        '239aec9f-066e-4e6a-88d7-9cdccd43445b',
        true
    );

INSERT INTO `friends`(`user_id`, `friend_user_id`, `is_unfriended`)
VALUES (
        '239aec9f-066e-4e6a-88d7-9cdccd43445b',
        'ddfffcd7-983c-4f83-b998-884c36bea194',
        true
    );

-- Create direct chat between Lotta Schmiedmann and Larry Smith.
INSERT INTO `chats`(`chat_id`, `type`)
VALUES ('c67f0e6a-f841-46b2-b13b-f403550c00e9', 'direct');

UPDATE `friends`
SET `chat_id` = 'c67f0e6a-f841-46b2-b13b-f403550c00e9'
WHERE `user_id` = '858560f9-fc03-43b0-b931-01213e4787ce'
    AND `friend_user_id` = '239aec9f-066e-4e6a-88d7-9cdccd43445b'
    OR `user_id` = '239aec9f-066e-4e6a-88d7-9cdccd43445b'
    AND `friend_user_id` = '858560f9-fc03-43b0-b931-01213e4787ce';

-- Insert direct messages sent between Lotta Schmiedmann and Larry Smith.
INSERT INTO `messages`(`chat_id`, `sender`, `message`)
VALUES (
        'c67f0e6a-f841-46b2-b13b-f403550c00e9',
        '239aec9f-066e-4e6a-88d7-9cdccd43445b',
        'Hello!'
    ),
    (
        'c67f0e6a-f841-46b2-b13b-f403550c00e9',
        '858560f9-fc03-43b0-b931-01213e4787ce',
        'Hi!'
    ),
    (
        'c67f0e6a-f841-46b2-b13b-f403550c00e9',
        '239aec9f-066e-4e6a-88d7-9cdccd43445b',
        'How''s the weather over there?'
    ),
    (
        'c67f0e6a-f841-46b2-b13b-f403550c00e9',
        '858560f9-fc03-43b0-b931-01213e4787ce',
        'It''s a bit cloudy, but otherwise alright.'
    );

-- There's a lot of creating and dropping triggers below. This is to
-- have the events on different days.

-- Add triggers to set event start and end dates into the future 
-- upon inserting data to the events table
CREATE TRIGGER event_start_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.starts_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 DAY);

CREATE TRIGGER event_end_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.ends_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 DAY);

-- Add add events for
INSERT INTO `events`(`id`, `name`, `description`)
VALUES (
        1,
        'First event',
        'The opening event to start the season'
);

DROP TRIGGER event_start_date_insert;
DROP TRIGGER event_end_date_insert;


CREATE TRIGGER event_start_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.starts_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 5 DAY);

CREATE TRIGGER event_end_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.ends_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 5 DAY);

INSERT INTO `events`(`id`, `name`, `description`)
VALUES (
        2,
        'Karaoke Night',
        "Karaoke night at the old folks' home"
);

DROP TRIGGER event_start_date_insert;
DROP TRIGGER event_end_date_insert;


CREATE TRIGGER event_start_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.starts_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 8 DAY);

CREATE TRIGGER event_end_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.ends_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 13 DAY);

INSERT INTO `events`(`id`, `name`, `description`)
VALUES (
        3,
        'Germany exchange',
        'The GoldenAge crew has set up an exchange with their partered business to the beautiful city of Tothenburg Ob Der Tauber.'
);

DROP TRIGGER event_start_date_insert;
DROP TRIGGER event_end_date_insert;

CREATE TRIGGER event_start_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.starts_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 3 DAY);

CREATE TRIGGER event_end_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.ends_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 3 DAY);

INSERT INTO `events`(`id`, `name`, `description`)
VALUES (
        4,
        'Speed Dating',
        'Speed dating for the elderly. Come find a new love.'
);

DROP TRIGGER event_start_date_insert;
DROP TRIGGER event_end_date_insert;

CREATE TRIGGER event_start_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.starts_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY);

CREATE TRIGGER event_end_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.ends_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY);

INSERT INTO `events`(`id`, `name`, `description`)
VALUES (
        5,
        'Dance Night',
        'Celebrate the rhythm of life at our enchanting Dance Night for Seniors! Join us for an evening filled with joy, laughter, and the timeless elegance of dance. Let the music transport you to a bygone era as we create a warm and inviting atmosphere for seniors to relish the beauty of movement. Whether you prefer the graceful waltz or the lively beats of swing, our event promises a delightful blend of classic tunes and modern favorites. Embrace the opportunity to twirl, sway, and connect with friends old and new in a celebration tailored to the golden years. Let the dance floor become a canvas for memories, as we come together to share in the delight of a night designed especially for you. Don your dancing shoes and join us for a magical evening where age is just a number, and the spirit of dance knows no bounds!'
);

DROP TRIGGER event_start_date_insert;
DROP TRIGGER event_end_date_insert;

CREATE TRIGGER event_start_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.starts_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 9 DAY);

CREATE TRIGGER event_end_date_insert BEFORE
INSERT ON `events` FOR EACH ROW
SET NEW.ends_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 9 DAY);

INSERT INTO `events`(`id`, `name`, `description`)
VALUES (
        6,
        'Sports',
        'Experience the thrill of friendly competition at our Elderly Sports Extravaganza! Join us for a day of camaraderie and light-hearted games tailored for seniors. From leisurely walks to spirited bocce ball matches, this event is all about staying active, having fun, and fostering a sense of community. Lace up and let the games begin!'
);

DROP TRIGGER event_start_date_insert;
DROP TRIGGER event_end_date_insert;

-- Sign Bob the Builder up for four of the created events.

INSERT INTO `event_attendees`(`event_id`, `user_id`)
VALUES 
    (1, "59158c35-8d77-43f1-bc63-3c5b4265b276"),
    (2, "59158c35-8d77-43f1-bc63-3c5b4265b276"),
    (3, "59158c35-8d77-43f1-bc63-3c5b4265b276"),
    (6, "59158c35-8d77-43f1-bc63-3c5b4265b276");