-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 11:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fly-away`
--
CREATE DATABASE IF NOT EXISTS `fly-away` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fly-away`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(4, 61),
(6, 66),
(8, 63),
(16, 71),
(17, 67),
(21, 61),
(22, 70),
(28, 71),
(31, 64),
(32, 66),
(33, 63),
(35, 70);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(300) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(4, 'Omer', 'David', 'omer-david@gamil.com', '54232240006d05a81775', 2),
(5, 'Pavel', 'Rivni', 'pavel-rivni@gamil.com', '207bd02f8387691c0af8', 2),
(6, 'Pavel', 'Rivni', 'pavel-rivnגגשדגi@gamil.com', '207bd02f8387691c0af8', 2),
(7, 'Tomer', 'Ben-Israel', 'tomer_ben@gmail.com', '207bd02f8387691c0af8', 2),
(8, 'Itay', 'Anitz', 'itay@gmail.com', '207bd02f8387691c0af8', 2),
(11, 'Admin', 'The boss', 'tomer_ben38491@gmail.com', '207bd02f8387691c0af8', 1),
(12, 'Tomer', 'Ben-Israel', 'tomer_ben_israel@gmail.com', '207bd02f8387691c0af8', 2),
(13, 'Tomer', 'Ben-Israel', 'tomer_ben_israel1989@gmail.com', '207bd02f8387691c0af8', 2),
(14, 'Tomer', 'Ben-Israel', 'tomer_ben_israel19899@gmail.com', '207bd02f8387691c0af8', 2),
(15, 'Tomer', 'Ben-Israel', 'tomer_ben_israe11111@gmail.com', '207bd02f8387691c0af8', 2),
(16, 'Bari', 'Alan', 'bari_alan@gmail.com', '207bd02f8387691c0af8', 1),
(17, 'Clarck', 'Kent', 'clarck_kent@gmail.com', '207bd02f8387691c0af8', 2),
(18, 'Tomer', 'Ben-Israel', 'tomer_ben_israe2023@gmail.com', '207bd02f8387691c0af8', 2),
(21, 'Leo', 'The Lion King', 'leo_lion@gmail.com', '207bd02f8387691c0af8', 2),
(22, 'Eliran', 'Bittan', 'eliran_bitan@gmail.com', '7c6377312008c65668a2', 2),
(23, 'Yogev', 'Bar', 'yogev_bar@gmail.com', '207bd02f8387691c0af8', 2),
(25, 'תומר', 'בן,ישראל', 'tomerben822229@gmail.com', '207bd02f8387691c0af8', 2),
(28, 'Daniel', 'Solomonov', 'ds123@gmail.com', '207bd02f8387691c0af8', 2),
(29, 'Itay', 'Herman', 'itay_herman@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa', 2),
(30, 'Shahar', 'Nuriani', 'shahar_nuriani@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa', 2),
(31, 'Shahaf', 'Siso', 'siso@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa', 2),
(32, 'Uriel', 'Kidron', 'uri@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa02e0109a6cdc3a7fb43922383bcf', 1),
(33, 'Moran', 'Fatal', 'mor@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa02e0109a6cdc3a7fb43922383bcf', 2),
(34, 'Pavel', 'Rivni', 'pav@gmail.com', 'd83c49feec15a08c7c903fed003937ea03ef372c537b79f351ee397541cd407f7b9e5e7cdcd3b159ec49c347259b18028d8d00fea501bd9484b034b130cfa637', 2),
(35, 'Edi', 'Kogan', 'ed@gmail.com', '65e7ceb429d7b1b1a97de3119bfbed3b3f641954092dab55550553cc9d7238ef053ae2202d2203b028911269185260e85892c953044521ca29c45276d48d6686', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startingDate` date NOT NULL,
  `endingDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startingDate`, `endingDate`, `price`, `imageName`) VALUES
(61, 'Tokyo', 'Explore the vibrant streets of Tokyo, where tradition meets modernity. Immerse yourself in the rich culture of Japan\'s capital city. Discover historic temples in Asakusa, gaze at the futuristic skyline from the Tokyo Skytree, and savor delicious sushi.', '2023-10-28', '2023-11-04', 6500.00, '2fa1932b-e8f5-4472-8865-706c4fb6fbcf.jpeg'),
(62, 'Paris', 'Experience a romantic getaway in the City of Love, Paris. Stroll along the Seine, indulge in delectable French cuisine, and visit iconic landmarks such as the Eiffel Tower and Louvre Museum.', '2023-10-09', '2023-10-16', 3400.00, 'bfc468ee-f89c-43fa-b928-4bed381787e7.jpeg'),
(63, 'Sydney', 'Discover the stunning beaches and vibrant culture of Sydney, Australia.', '2023-10-16', '2023-10-23', 7650.00, 'c3b9ab4b-3150-435d-90ee-f31ebb6f8447.jpeg'),
(64, 'New York', 'Immerse yourself in the energy and attractions of the Big Apple, New York City.', '2023-10-23', '2023-10-30', 5430.00, '13ed6bf6-ae6d-424f-8065-f8ac06ba5f56.jpeg'),
(65, 'Rome', 'Experience the ancient wonders of Rome.', '2023-11-01', '2023-11-08', 2300.00, '77ef207d-7ba7-4698-8893-e20ca0f6d9ba.jpeg'),
(66, 'Cairo', 'Journey to Cairo, Egypt, and explore its historical treasures.', '2023-11-08', '2023-11-15', 2000.00, '759270f4-8eaf-4bba-82b6-16a49f9d1c2c.jpeg'),
(67, 'Bali', 'Relax on Bali\'s pristine beaches and enjoy its tropical paradise.', '2023-11-15', '2023-11-22', 9875.00, '50e674f3-50e3-4535-878a-a28c0b813fd6.jpeg'),
(68, 'London', 'Dive into the rich history of London, England.', '2023-11-22', '2023-11-29', 4800.00, '144806d1-b2e6-4752-bc38-16192ac10d55.jpeg'),
(69, 'Rio de Janeiro:', 'Samba your way through the vibrant culture of Rio de Janeiro, Brazil.', '2023-12-01', '2023-12-05', 3400.00, '53393701-f7b1-4d29-9b95-c0ea3c1cb9ed.jpeg'),
(70, 'Dubai', 'Discover the opulence of Dubai, a city of modern wonders and luxury.', '2023-12-05', '2023-12-10', 4920.00, '51fa9361-9a89-42f2-aa57-965008f1cee9.jpeg'),
(71, 'Amsterdam', 'Explore the charming canals and historic streets of Amsterdam, Netherlands.', '2023-12-10', '2023-12-15', 3000.00, '32bd5395-cb60-4a9c-822f-389449748339.jpeg'),
(72, 'Cape Town', 'Experience the beauty of Cape Town\'s landscapes and diverse culture in South Africa.', '2023-12-15', '2023-12-25', 7000.00, '89879afc-3f51-4490-94c6-3d635e6becef.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
