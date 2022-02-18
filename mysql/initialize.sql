drop database if exists final_project;
create database final_project;
use final_project;
CREATE TABLE `Recipes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `method` varchar(255),
  `occation` varchar(255),
  `kind` varchar(255),
  `image` text NOT NULL,
  `mean_rating` float DEFAULT 0
);
CREATE TABLE `Ingredients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `ingredients` varchar(255) NOT NULL
);
CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` text,
  `nickname` varchar(255),
  `social` varchar(255) DEFAULT "local"
);
CREATE TABLE `Boards` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `ingredient` text,
  `sauce` text,
  `step` text,
  `step_img` text,
  `created_at` date
);
CREATE TABLE `Recipe_likes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int,
  `user_id` int
);
CREATE TABLE `Recipe_comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int,
  `user_id` int,
  `comment` text,
  `recipe_rating` int,
  `created_at` date
);
ALTER TABLE
  `Ingredients`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);
ALTER TABLE
  `Boards`
ADD
  FOREIGN KEY (`id`) REFERENCES `Recipes` (`id`);
ALTER TABLE
  `Boards`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
ALTER TABLE
  `Recipe_likes`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);
ALTER TABLE
  `Recipe_likes`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
ALTER TABLE
  `Recipe_comments`
ADD
  FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);
ALTER TABLE
  `Recipe_comments`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);