drop database if exists final_project;
create database final_project;
use final_project;
CREATE TABLE `Recipes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `name` varchar(255) NOT NULL,
  `method` varchar(255),
  `occation` varchar(255),
  `kind` varchar(255),
  `main_image` text NOT NULL,
  `cooking_step` text,
  `cooking_image` text,
  `serving` int,
  `time` varchar(255),
  `total_ingredients` text,
  `mean_rating` float DEFAULT 0,
  `created_at` date DEFAULT (CURRENT_DATE)
);
CREATE TABLE `Ingredients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `ingredients_id` int NOT NULL
);
CREATE TABLE `Ingredients_index` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE
);
CREATE TABLE `Comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int,
  `user_id` int,
  `comment` text,
  `rating` int DEFAULT 0,
  `created_at` date DEFAULT (CURRENT_DATE)
);
CREATE TABLE `Recomments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comment_id` int,
  `comment` text,
  `user_id` int,
  `created_at` date DEFAULT (CURRENT_DATE)
);
CREATE TABLE `Likes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `recipe_id` int
);
CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` text,
  `nickname` varchar(255),
  `social` varchar(255) DEFAULT "local"
);
ALTER TABLE
  `Recipes`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
ALTER TABLE
  `Ingredients`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);
ALTER TABLE
  `Ingredients`
ADD
  FOREIGN KEY (`ingredients_id`) REFERENCES `Ingredients_index` (`id`);
ALTER TABLE
  `Comments`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);
ALTER TABLE
  `Comments`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
ALTER TABLE
  `Recomments`
ADD
  FOREIGN KEY (`comment_id`) REFERENCES `Comments` (`id`);
ALTER TABLE
  `Recomments`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
ALTER TABLE
  `Likes`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
ALTER TABLE
  `Likes`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);