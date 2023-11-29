-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2023 at 01:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `rating` varchar(250) NOT NULL,
  `comments` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game1`
--

CREATE TABLE `game1` (
  `game1_id` int(11) NOT NULL,
  `game1_difficulty` varchar(255) NOT NULL,
  `game1_score` bigint(20) DEFAULT NULL,
  `game1_time` bigint(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game1`
--

INSERT INTO `game1` (`game1_id`, `game1_difficulty`, `game1_score`, `game1_time`, `userId`) VALUES
(1, 'easy', 0, 60, 5),
(2, 'easy', 0, 60, 5),
(3, 'easy', 0, 60, 5),
(4, 'easy', 0, 60, 5),
(14, 'easy', 6, 50, 6),
(15, 'easy', 0, 10, 6),
(16, 'easy', 0, 52, 6),
(17, 'easy', 0, 23, 6),
(18, 'hard', 0, 7, 6),
(19, 'easy', 0, 5, 6),
(20, 'easy', 0, 60, 6),
(21, 'easy', 0, 60, 6),
(22, 'easy', 0, 60, 6),
(23, 'easy', 0, 60, 6),
(24, 'medium', 12, 65, 6),
(25, 'easy', 10, 60, 7),
(26, 'easy', 18, 60, 7);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `username`, `email`, `password`) VALUES
(4, 'Pavan Chintakayala', 'pavan123', 'Pa1chintakayala@gmail.com', 'Passw0rd!'),
(5, 'demo', 'demo', 'demo@gmail.com', 'Demo1@demo'),
(6, 'Sample', 'Sample', 'Sample@gmail.com', 'Sample@123'),
(7, 'Pavan', 'Pavan', 'pavan@google.com', 'Sample@123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game1`
--
ALTER TABLE `game1`
  ADD PRIMARY KEY (`game1_id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `game1`
--
ALTER TABLE `game1`
  MODIFY `game1_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game1`
--
ALTER TABLE `game1`
  ADD CONSTRAINT `game1_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `login` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
