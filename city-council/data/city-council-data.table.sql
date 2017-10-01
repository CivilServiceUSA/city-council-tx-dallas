SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `city-council`
-- ----------------------------
DROP TABLE IF EXISTS `city-council`;
CREATE TABLE `city-council` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state_code` char(2) NOT NULL,
  `state_name` varchar(100) NOT NULL,
  `state_slug` varchar(100) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `city_slug` varchar(100) NOT NULL,
  `city_population` int(11) NOT NULL,
  `city_background_url` varchar(100) NOT NULL,
  `city_government_url` varchar(100) NOT NULL,
  `city_council_url` varchar(100) DEFAULT NULL,
  `city_council_council_calendar_url` varchar(100) DEFAULT NULL,
  `city_council_legislation_url` varchar(100) DEFAULT NULL,
  `city_council_committees_url` varchar(100) DEFAULT NULL,
  `city_latitude` float(10,0) NOT NULL,
  `city_longitude` float(10,0) NOT NULL,
  `district` varchar(25) DEFAULT NULL,
  `at_large` varchar(5) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `name_slug` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` enum('female','male','unspecified') NOT NULL DEFAULT 'unspecified',
  `ethnicity` enum('african-american','asian-american','hispanic-american','middle-eastern-american','multi-racial-american','native-american','pacific-islander','white-american','unspecified') NOT NULL DEFAULT 'unspecified',
  `date_of_birth` date DEFAULT NULL,
  `entered_office` date DEFAULT NULL,
  `term_end` date DEFAULT NULL,
  `title` enum('alderman','chairman','city-attorney','city-auditor','city-controller','commissioner','council-president','councilor','deputy-leader','deputy-mayor-pro-tem','deputy-majority-leader','deputy-majority-whip','deputy-minority-leader','deputy-minority-whip','district-attorney','majority-leader','majority-whip','mayor','mayor-pro-tem','minority-leader','minority-whip','representative','supervisor','president','president-pro-tem','vice-chairman','vice-mayor','vice-president','vacant') NOT NULL DEFAULT 'councilor',
  `party` enum('constitution','democrat','green','independent','libertarian','nonpartisan','republican') NOT NULL DEFAULT 'nonpartisan',
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address_complete` varchar(255) NOT NULL,
  `address_number` varchar(10) NOT NULL,
  `address_prefix` varchar(10) NOT NULL,
  `address_street` varchar(100) NOT NULL,
  `address_sec_unit_type` varchar(10) NOT NULL,
  `address_sec_unit_num` varchar(10) NOT NULL,
  `address_city` varchar(50) NOT NULL,
  `address_state` varchar(50) NOT NULL,
  `address_zipcode` varchar(10) NOT NULL,
  `address_type` varchar(20) NOT NULL,
  `twitter_handle` varchar(20) DEFAULT NULL,
  `twitter_url` varchar(100) DEFAULT NULL,
  `facebook_url` varchar(100) DEFAULT NULL,
  `photo_url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;