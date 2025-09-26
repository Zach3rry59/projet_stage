CREATE DATABASE IF NOT EXISTS `projet_stage`;
USE `projet_stage`;

CREATE TABLE IF NOT EXISTS `user`(
   id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL,
   role INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS `city`(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   cp INT NOT NULL,
   modified_at DATETIME,
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `center`(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50),
   adress VARCHAR(50),
   phone VARCHAR(10),
   id_city INT NOT NULL,
   modified_at DATETIME,
   PRIMARY KEY(id),
   FOREIGN KEY(id_city) REFERENCES city(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `employee`(
   id INT NOT NULL AUTO_INCREMENT,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50),
   formation VARCHAR(100),
   phone VARCHAR(10),
   email VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `room`(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   date_start DATE,
   date_end DATE,
   infos VARCHAR(200),
   formation_name VARCHAR(100),
   capacity INT,
   computer INT,
   id_employee INT,
   id_center INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_employee) REFERENCES employee(id) ON DELETE SET NULL,
   FOREIGN KEY(id_center) REFERENCES center(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `key`(
   id INT NOT NULL AUTO_INCREMENT,
   id_employee INT,
   id_center INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_employee) REFERENCES employee(id) ON DELETE SET NULL,
   FOREIGN KEY(id_center) REFERENCES center(id) ON DELETE CASCADE
);
