SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `city-council`
-- ----------------------------
DROP TABLE IF EXISTS `city-council`;
CREATE TABLE `city-council` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state_code` char(2) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `city_slug` varchar(100) NOT NULL,
  `city_population` int(11) NOT NULL,
  `city_background_url` varchar(100) NOT NULL,
  `city_website` varchar(100) NOT NULL,
  `public_records` varchar(100) DEFAULT NULL,
  `latitude` float(10,0) NOT NULL,
  `longitude` float(10,0) NOT NULL,
  `district` varchar(5) DEFAULT NULL,
  `at_large` varchar(5) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `name_slug` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` enum('female','male','unspecified') NOT NULL DEFAULT 'unspecified',
  `ethnicity` enum('african-american','asian-american','hispanic-american','middle-eastern-american','native-american','pacific-islander','white-american') NOT NULL DEFAULT 'white-american',
  `date_of_birth` date DEFAULT NULL,
  `title` enum('councilor','mayor','vice-mayor','district-attorney','council-president','majority-leader','majority-whip','minority-leader','minority-whip','deputy-majority-leader','deputy-majority-whip','deputy-minority-leader','deputy-minority-whip') NOT NULL DEFAULT 'councilor',
  `party` enum('democrat','republican','independent','libertarian','green','constitution','nonpartisan') NOT NULL DEFAULT 'nonpartisan',
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `twitter_url` varchar(100) DEFAULT NULL,
  `facebook_url` varchar(100) DEFAULT NULL,
  `photo_url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
