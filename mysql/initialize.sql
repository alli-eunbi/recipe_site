drop database if exists final_project;
create database final_project;
use final_project;
CREATE TABLE `Recipes` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `method` varchar(255),
  `occation` varchar(255),
  `kind` varchar(255),
  `image` text NOT NULL
);
CREATE TABLE `Ingredients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `ing` varchar(255) NOT NULL
);
ALTER TABLE
  `Ingredients`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);