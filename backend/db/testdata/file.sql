-- Insert test data into the database

-- Users table
-- Creates four test users, two regular user, one caretaker and one admin.
-- Regular premium user.
INSERT INTO `users`(`id`,`first_name`,`last_name`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT '858560f9-fc03-43b0-b931-01213e4787ce','Lotta','Schmiedmann','lottas@test.com','65300','Vaasa','fi','2589631470','$2y$12$Z1PD1PxuAyVn0IgKp.hOMu1C/iPLiGmVB0rcljJYVPPIST9sf/Ql.',1,id FROM `roles` WHERE `name`='user';

-- Regular non-premium user
INSERT INTO `users`(`id`,`first_name`,`last_name`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT 'ddfffcd7-983c-4f83-b998-884c36bea194','Thomas','Tester','thomast@test.com','93800','Kuusamo','fi','1234567890','$2y$12$j8SYGa9b/mIMwpe9UBk5AOvZC/P3AB4KlOVI.QEPW6cRPCoOZoq4u',0,id FROM `roles` WHERE `name`='user';

-- Caretaker, premium user
INSERT INTO `users`(`id`,`first_name`,`last_name`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT '59158c35-8d77-43f1-bc63-3c5b4265b276','Bob','Builer','bobb@test.com','00100','Helsinki','fi','9876543210','$2y$12$G0t7qbxt/jLjLf1pVfNwF.GrIDqhV5zkQ2h6NwaB3EmfI75T5MP1W',1,id FROM `roles` WHERE `name`='caretaker';

-- Admin, premium user
INSERT INTO `users`(`id`,`first_name`,`last_name`,`email`,`postal_code`,`city`,`country`,`phone`,`password`,`premium`,`role_id`)
SELECT 'e16a6eac-9993-4137-9221-7c879337bbe4','Anthony','Administrator','anthonya@test.com','20500','Turku','fi','1397824650','$2y$12$X0ByuB55Ca.59od3gFL2/eSZs5Zx9ZWmFGtq0cIIJKpNwYWYYi5Jy',1,id FROM `roles` WHERE `name`='admin';
