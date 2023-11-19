-- Insert test data into the database

-- Users table
-- Regular premium user. Password: Lotta12345
INSERT INTO `users`(`id`,`first_name`,`last_name`, `bio`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT '858560f9-fc03-43b0-b931-01213e4787ce','Lotta','Schmiedmann', 'This is the profile of Lotta Schmiedmann, a regular premium user of GoldenAge.','lottas@test.com','65300','Vaasa','fi','2589631470','$2y$12$RRPzbGc5Sxf8lunSTYZmeOZql12ifELndypkHIYrQmxcn7/HysLli',1,id FROM `roles` WHERE `name`='user';

-- Regular non-premium user. Password: Thomas12345
INSERT INTO `users`(`id`,`first_name`,`last_name`, `bio`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT 'ddfffcd7-983c-4f83-b998-884c36bea194','Thomas','Tester','This is the profile of Thomas Tester, a regular non-premium user of GoldenAge.','thomast@test.com','93800','Kuusamo','fi','1234567890','$2y$12$Dq3CBg6zOsoTcOgPz1KkP.uxF/q8YVxiaaBMBo1fWObOglYKm.u0y',0,id FROM `roles` WHERE `name`='user';

-- Caretaker, premium user. Password: Bob12345
INSERT INTO `users`(`id`,`first_name`,`last_name`, `bio`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT '59158c35-8d77-43f1-bc63-3c5b4265b276','Bob','Builer','This is the profile of Bob the Builder, a caretaker at GoldenAge with a premium account.','bobb@test.com','00100','Helsinki','fi','9876543210','$2y$12$/HKypYHzWXAVigx7tjXQiOvx2q54Oyzo.t/hgWoehm6xhrQFS1h5W',1,id FROM `roles` WHERE `name`='caretaker';

-- Caretaker, non-premium user. Password Larry12345
INSERT INTO `users`(`id`,`first_name`,`last_name`, `bio`, `email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT '239aec9f-066e-4e6a-88d7-9cdccd43445b', 'Larry', 'Smith', 'This is the profile of Larry Smith, a caretaker at GoldenAge who does not have a premium account.', 'larrys@test.com', '90100', 'Oulu', 'fi', '5293471805', '$2y$12$VXZym8v/XynBsSNzmP5zDu9yBdN3.iVR794eEgbfn7O3O.K/mWqly', 0, id FROM `roles` WHERE `name`='caretaker';

-- Admin, premium user. Password: Anthony12345
INSERT INTO `users`(`id`,`first_name`,`last_name`, `bio`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT 'e16a6eac-9993-4137-9221-7c879337bbe4','Anthony','Administrator','This is the profile of Antony Administator, an admin at GoldenAge with a premium account.','anthonya@test.com','20500','Turku','fi','1397824650','$2y$12$DbW0B2qdDu/sJ0SSm/rVoOwDTC4qD8oowndeJ4v3v/YUO4iqq7fne',1,id FROM `roles` WHERE `name`='admin';

-- Admin, non-premium user. Password: testPassw0rd
INSERT INTO `users`(`id`,`first_name`,`last_name`,`bio`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT '41284e8d-ee2b-4e15-b9af-296de2a9af8a','Adam','Administrator','This is the profile of Adam Administrator, an admin at GoldenAge without a premium account.','adama@test.com','57710','Savonlinna','fi','+358123456790','$2a$12$GVly7eDkfYYbsJZTy9ug7.ZMLxgtXw7IcuVS2vMpG1UdnZq7mNvCq',0,id FROM `roles` WHERE `name`='admin';
