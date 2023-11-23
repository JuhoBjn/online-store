/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `chat_id` varchar(36) NOT NULL,
  `type` enum('direct','group') NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT 'New chat',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_message_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_attendees`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_attendees` (
  `event_id` int NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`event_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_attendees_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `event_attendees_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `events`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `picture_id` int DEFAULT NULL,
  `starts_at` timestamp NOT NULL,
  `ends_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `picture_id` (`picture_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`picture_id`) REFERENCES `files` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `files`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `object_key` varchar(1024) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `mimetype` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friend_requests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requester_user_id` varchar(36) NOT NULL,
  `requested_friend_user_id` varchar(36) NOT NULL,
  `is_accepted` tinyint(1) NOT NULL DEFAULT '0',
  `is_rejected` tinyint(1) NOT NULL DEFAULT '0',
  `request_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `requester_user_id` (`requester_user_id`),
  KEY `requested_friend_user_id` (`requested_friend_user_id`),
  CONSTRAINT `friend_requests_ibfk_1` FOREIGN KEY (`requester_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `friend_requests_ibfk_2` FOREIGN KEY (`requested_friend_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friends`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) NOT NULL,
  `friend_user_id` varchar(36) NOT NULL,
  `became_friends_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_unfriended` tinyint(1) NOT NULL DEFAULT '0',
  `chat_id` varchar(36) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_friend_user_id` (`user_id`,`friend_user_id`),
  KEY `friend_user_id` (`friend_user_id`),
  KEY `fk_friends_chats` (`chat_id`),
  CONSTRAINT `fk_friends_chats` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE,
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(36) NOT NULL,
  `sender` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schema_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(128) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(320) NOT NULL,
  `postal_code` varchar(5) DEFAULT NULL,
  `city` varchar(85) DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  `last_location_latitude` decimal(8,6) DEFAULT NULL,
  `last_location_longitude` decimal(9,6) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `premium` tinyint(1) DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_id` int NOT NULL,
  `email_hash` varchar(64) GENERATED ALWAYS AS (sha2(lower(trim(`email`)),256)) STORED,
  `bio` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_roles_idx` (`role_id`),
  CONSTRAINT `fk_users_roles_idx` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

--
-- Dbmate schema migrations
--

LOCK TABLES `schema_migrations` WRITE;
INSERT INTO `schema_migrations` (version) VALUES
  ('20230925220224'),
  ('20230926173433'),
  ('20231004182642'),
  ('20231024203602'),
  ('20231025202701'),
  ('20231028173329'),
  ('20231029153934'),
  ('20231114145827'),
  ('20231114194708'),
  ('20231118215618'),
  ('20231121210858');
UNLOCK TABLES;
