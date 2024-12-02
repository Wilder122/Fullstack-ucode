USE ucode_web;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

INSERT INTO users (login, password, role) VALUES 
('adminuser', 'hashedpassword', 'admin'),
('newuser', 'hashedpassword', 'user');
