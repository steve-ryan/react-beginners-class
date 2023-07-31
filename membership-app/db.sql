CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membershipNo` int NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `IDNo` int NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `pword` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`id`)
);
