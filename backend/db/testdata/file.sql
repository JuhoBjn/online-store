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

-- Add news articles
INSERT INTO `news`(`headline`, `body`, `link`)
VALUES (
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
        'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.',
        'https://example.com'
    ),
    (
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        'totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt',
        'https://example.com'
    ),
    (
        'The European languages are members of the same family',
        'Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.',
        'https://example.com'
    ),
    (
        'Far far away, behind the word mountains',
        'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn&apos;t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.',
        'https://example.com'
    ),
    (
        'The quick, brown fox jumps over a lazy dog.',
        'DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard&apos;s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek&apos;s fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.',
        'https://example.com'
    ),
    (
        'Li Europan lingues es membres del sam familie',
        'Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.',
        'https://example.com'
    )

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