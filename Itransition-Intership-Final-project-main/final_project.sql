-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 09:07 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminactions`
--

CREATE TABLE `adminactions` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action_type` enum('block','unblock','remove_admin','add_admin') NOT NULL,
  `action_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `template_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `template_id`, `user_id`, `comment_text`, `created_at`) VALUES
(3, 13, 1, 'fine', '2024-10-09 13:39:35'),
(4, 13, 3, 'good', '2024-10-09 13:39:35'),
(5, 14, 2, 'ok ok', '2024-10-09 13:45:14'),
(6, 14, 1, 'bye bye', '2024-10-09 13:45:14'),
(7, 15, 3, 'very good', '2024-10-09 13:46:40'),
(8, 15, 1, 'fine', '2024-10-09 13:46:40'),
(13, 21, 1, 'well well', '2024-10-14 20:22:40'),
(14, 31, 4, 'all is well', '2024-10-15 05:32:50'),
(15, 32, 1, 'te5r ytg5ey', '2024-10-18 18:10:49'),
(16, 32, 1, 'ghyertghy ', '2024-10-18 18:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `formanswers`
--

CREATE TABLE `formanswers` (
  `id` int(11) NOT NULL,
  `response_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `formresponses`
--

CREATE TABLE `formresponses` (
  `id` int(11) NOT NULL,
  `template_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `filled_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `template_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `template_id`, `user_id`) VALUES
(1, 31, 1),
(2, 32, 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `template_id` int(11) DEFAULT NULL,
  `question_text` text NOT NULL,
  `question_type` enum('single-line','multi-line','integer','checkbox') NOT NULL,
  `display_in_table` tinyint(1) DEFAULT 0,
  `position` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `template_id`, `question_text`, `question_type`, `display_in_table`, `position`, `created_at`, `updated_at`) VALUES
(7, 13, 'hello!', 'single-line', 0, 1, '2024-10-09 13:39:35', '2024-10-09 13:39:35'),
(8, 13, 'name?', 'single-line', 0, 2, '2024-10-09 13:39:35', '2024-10-09 13:39:35'),
(9, 13, 'Age', '', 0, 3, '2024-10-09 13:39:35', '2024-10-09 13:39:35'),
(10, 14, 'name?', 'single-line', 0, 1, '2024-10-09 13:45:14', '2024-10-09 13:45:14'),
(11, 14, 'village?', 'single-line', 0, 2, '2024-10-09 13:45:14', '2024-10-09 13:45:14'),
(12, 14, 'year?', 'single-line', 0, 3, '2024-10-09 13:45:14', '2024-10-09 13:45:14'),
(13, 15, 'age?', '', 0, 1, '2024-10-09 13:46:40', '2024-10-09 13:46:40'),
(22, 21, 'what is your name?', 'single-line', 0, 1, '2024-10-14 20:22:40', '2024-10-14 20:22:40'),
(23, 21, 'how old are you?', '', 0, 2, '2024-10-14 20:22:40', '2024-10-14 20:22:40'),
(24, 31, 'ok?', 'single-line', 0, 1, '2024-10-15 05:32:50', '2024-10-15 05:32:50'),
(25, 31, 'not ok?', '', 0, 2, '2024-10-15 05:32:50', '2024-10-15 05:32:50'),
(26, 32, 'het h', 'single-line', 0, 1, '2024-10-18 18:10:49', '2024-10-18 18:10:49'),
(27, 32, 'gher5thy ge5', '', 0, 2, '2024-10-18 18:10:49', '2024-10-18 18:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `image_url` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `title`, `description`, `author_id`, `is_public`, `image_url`, `topic`, `created_at`, `updated_at`) VALUES
(13, '1st template', 'this is my 1st template', 1, 0, NULL, NULL, '2024-10-09 13:39:35', '2024-10-09 13:39:35'),
(14, '2nd template', 'this is 2nd template', 7, 0, NULL, NULL, '2024-10-09 13:45:14', '2024-10-22 12:17:45'),
(15, '3rd template', 'this is 3rd template', 3, 0, NULL, NULL, '2024-10-09 13:46:40', '2024-10-17 07:20:04'),
(21, '6th template', 'this is 6th template', 4, 0, NULL, NULL, '2024-10-14 20:22:40', '2024-10-17 07:20:10'),
(31, '7th template', 'This is 2nd template', 2, 0, NULL, NULL, '2024-10-15 05:32:50', '2024-10-17 07:20:12'),
(32, '8th template', 'gdrthbdt h', 1, 0, NULL, NULL, '2024-10-18 18:10:49', '2024-10-18 18:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `templatetags`
--

CREATE TABLE `templatetags` (
  `template_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `is_blocked` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `is_blocked`, `created_at`) VALUES
(1, 'john_doe', 'john@example.com', 'hashed_password1', 'user', 0, '2024-10-08 14:21:26'),
(2, 'jane_smith', 'jane@example.com', 'hashed_password2', 'user', 0, '2024-10-08 14:21:26'),
(3, 'admin_user', 'admin@example.com', 'hashed_password3', 'admin', 0, '2024-10-08 14:21:26'),
(4, 'blocked_user', 'blocked@example.com', 'hashed_password4', 'user', 1, '2024-10-08 14:21:26'),
(5, 'user_two', 'user2@example.com', 'hashed_password5', 'user', 0, '2024-10-08 14:21:26'),
(6, 'admin_two', 'admin2@example.com', 'hashed_password6', 'admin', 0, '2024-10-08 14:21:26'),
(7, 'Tamal', 't@gmail.com', '$2a$10$fG4s1TKJ5PWlEJuHQfPz8.5JwcOps265hINJFaQ7G2nCbs2Ld8.yC', 'user', 0, '2024-10-19 14:01:10'),
(9, 'Tamal Sarker', 'tom@gmail.com', '$2a$10$SsT0ppIF5/YJy0nQR1IOjeWuSJImByr208zxOIQidH/TjRlsJJ44u', 'user', 0, '2024-10-24 06:54:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminactions`
--
ALTER TABLE `adminactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_id` (`template_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `formanswers`
--
ALTER TABLE `formanswers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `response_id` (`response_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `formresponses`
--
ALTER TABLE `formresponses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_id` (`template_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `template_id` (`template_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_id` (`template_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `templatetags`
--
ALTER TABLE `templatetags`
  ADD PRIMARY KEY (`template_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminactions`
--
ALTER TABLE `adminactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `formanswers`
--
ALTER TABLE `formanswers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `formresponses`
--
ALTER TABLE `formresponses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adminactions`
--
ALTER TABLE `adminactions`
  ADD CONSTRAINT `adminactions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `adminactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `formanswers`
--
ALTER TABLE `formanswers`
  ADD CONSTRAINT `formanswers_ibfk_1` FOREIGN KEY (`response_id`) REFERENCES `formresponses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formanswers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `formresponses`
--
ALTER TABLE `formresponses`
  ADD CONSTRAINT `formresponses_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formresponses_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `templates`
--
ALTER TABLE `templates`
  ADD CONSTRAINT `templates_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `templatetags`
--
ALTER TABLE `templatetags`
  ADD CONSTRAINT `templatetags_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `templatetags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
