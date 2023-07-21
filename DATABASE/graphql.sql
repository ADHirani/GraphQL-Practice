-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2023 at 06:08 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `graphql`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reporting_to` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `first_name`, `last_name`, `email`, `reporting_to`) VALUES
('0c763337-2ae7-480d-bfd4-be0d4e16db09', 'BBB', 'BBB', 'bbb@bbb.com', '41'),
('fe4aec1a-2fd6-4db6-899f-e0c09f8385a7', 'AAA', 'AAA', 'aaa@aaa.com', '41');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `message`, `sender`) VALUES
('24070225-7d37-4818-958e-ee892a37d23f', 'Hello bro', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('5765e996-0275-49e3-be31-d45268b6b5ff', 'Yo', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('6eea88f2-7e3a-4368-9929-149e0fafdb5c', 'Yo', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('87836c8a-be83-497f-8d0c-0ffcdd7cff55', 'hy', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('9ce198c7-e2ef-41c9-8456-aa71f1078a19', 'hy', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('a38fe731-b736-41d7-b5d8-570406f48fcd', 'hy', '0c763337-2ae7-480d-bfd4-be0d4e16db09'),
('c3e3f1c3-97c0-4df4-9905-3da41d71d606', 'hy', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('cd04de0d-d394-4338-8f1f-4641027c5ce7', 'hy', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('e042dd27-9cbd-4d22-88f4-940eca6877f8', 'hy', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7'),
('f05974f4-9bd4-485f-ba9c-3109601aa018', 'Hello', 'fe4aec1a-2fd6-4db6-899f-e0c09f8385a7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
