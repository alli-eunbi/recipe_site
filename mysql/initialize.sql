drop database if exists final_project;
create database final_project;
use final_project;
CREATE TABLE `Recipes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `name` varchar(255) NOT NULL,
  `main_image` text NOT NULL,
  `cooking_step` text,
  `cooking_image` text,
  `serving` varchar(255),
  `time` varchar(255),
  `total_ingredients` text,
  `created_at` date DEFAULT (CURRENT_DATE)
);

CREATE TABLE `Categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int,
  `name` varchar(255),
  `type` varchar(255)
);

CREATE TABLE `Recipes_Ingredients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `ingredients_id` int NOT NULL
);

CREATE TABLE `Ingredients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE
);

CREATE TABLE `Comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` int,
  `user_id` int,
  `parent_id` int DEFAULT 0,
  `comment` text,
  `rating` int DEFAULT 0,
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

ALTER TABLE `Recipes` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Categories` ADD FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);

ALTER TABLE `Recipes_Ingredients` ADD FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);

ALTER TABLE `Recipes_Ingredients` ADD FOREIGN KEY (`ingredients_id`) REFERENCES `Ingredients` (`id`);

ALTER TABLE `Comments` ADD FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);

ALTER TABLE `Comments` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Likes` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Likes` ADD FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);

insert into Users (`id`, `email`, `password`, `nickname`, `social`) values (1, '만개의레시피', '만개의레시피', '만개의 레시피', 'local');

load data infile '/lib/mysql-files/final_recipes.csv' into table Recipes fields terminated by ',' enclosed by '"' lines terminated by '\r\n' ignore 1 rows;

load data infile '/lib/mysql-files/ingredients.csv' into table Ingredients fields terminated by ',' enclosed by '"' lines terminated by '\r\n' ignore 1 rows;

load data infile '/lib/mysql-files/recipes_ingredients.csv' into table Recipes_Ingredients fields terminated by ',' enclosed by '"' lines terminated by '\r\n' ignore 1 rows;

load data infile '/lib/mysql-files/categories.csv' into table Categories fields terminated by ',' enclosed by '"' lines terminated by '\r\n' ignore 1 rows;