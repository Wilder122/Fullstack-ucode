CREATE DATABASE ucode_web;
CREATE USER 'golop'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON ucode_web.* TO 'golop'@'localhost';

FLUSH PRIVILEGES;
