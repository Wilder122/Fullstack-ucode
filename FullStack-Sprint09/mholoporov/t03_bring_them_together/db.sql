CREATE DATABASE ucode_web;
USE ucode_web;

CREATE TABLE IF NOT EXISTS users (
      id int NOT NULL AUTO_INCREMENT,
      login varchar(30) UNIQUE NOT NULL,
      status ENUM('admin', 'user') DEFAULT (2),
      password varchar(255) NOT NULL,
      full_name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      PRIMARY KEY (id)
);