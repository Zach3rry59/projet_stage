CREATE DATABASE IF NOT EXISTS `projet_stage`;
USE `projet_stage`;

CREATE TABLE IF NOT EXISTS `user`(
   id INT NOT NULL,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL,
   role INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS `city`(
   id INT NOT NULL,
   name VARCHAR(50) NOT NULL,
   modified_at DATETIME,
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `center`(
   id INT NOT NULL,
   name VARCHAR(50),
   cp INT,
   adress VARCHAR(50),
   id_city INT NOT NULL,
   modified_at DATETIME,
   PRIMARY KEY(id),
   FOREIGN KEY(id_city) REFERENCES city(id)
);

CREATE TABLE IF NOT EXISTS `employee`(
   id INT,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50),
   formation VARCHAR(100),
   phone INT,
   email VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `room`(
   id INT,
   name VARCHAR(50) NOT NULL,
   date_start DATE,
   date_end DATE,
   infos VARCHAR(200),
   formation_name VARCHAR(100),
   employee_id INT,
   center_id INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(employee_id),
   FOREIGN KEY(employee_id) REFERENCES employee(id),
   FOREIGN KEY(center_id) REFERENCES center(id)
);

CREATE TABLE IF NOT EXISTS `key`(
   id INT,
   id_employee INT,
   id_center INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_employee) REFERENCES employee(id),
   FOREIGN KEY(id_center) REFERENCES center(id)
);
