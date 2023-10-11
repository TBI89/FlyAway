-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2023 at 07:01 PM
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
(36, 61),
(36, 62),
(36, 63),
(36, 73);

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
(32, 'Admin', 'Special', 'special-admin@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa02e0109a6cdc3a7fb43922383bcf', 1),
(36, 'User', 'Normal', 'normal-user@gmail.com', '207bd02f8387691c0af8feb032794205ff92221d2bd83bce50484e429c16a622db6df4e32588123ce7fd9ba474f92cf2adfa02e0109a6cdc3a7fb43922383bcf', 2),
(37, 'Another', 'User', 'another-user@gmail.com', '26d14c6174d6a28972d1d1fa040fbfa7dba528d8aff08303af8745e3c757c50691b523805e86f888b47951c6fb60c28dae9080f1c9820511aceba001e1924971', 2);

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
(61, 'Tokyo', ' Tokyo, a vibrant metropolis where ancient traditions blend seamlessly with futuristic innovation. Experience iconic landmarks, delectable cuisine, bustling markets, and unmatched hospitality in this captivating cityscape.', '2023-10-17', '2023-10-31', 2500.00, '6d616a2f-9922-4907-b422-3231896d3f28.jpeg'),
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
(72, 'Cape Town', 'Experience the beauty of Cape Town\'s landscapes and diverse culture in South Africa.', '2023-12-15', '2023-12-25', 7000.00, '89879afc-3f51-4490-94c6-3d635e6becef.jpeg'),
(73, 'Maldives', 'Discover paradise in the Maldives, where crystal-clear turquoise waters meet powdery white sand beaches. Indulge in luxurious overwater bungalows, snorkel vibrant coral reefs, and savor exquisite cuisine amidst breathtaking sunsets.', '2023-10-25', '2023-11-30', 9499.00, 'a14ee7db-5387-4fde-b5c6-c454fc49a560.jpeg');

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

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
