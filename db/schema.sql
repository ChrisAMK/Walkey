DROP DATABASE IF EXISTS walk-e;

CREATE DATABASE walk-e;

USE walk-e;

CREATE TABLE users (
	id INT NOT NULL auto_increment,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob date NOT NULL,
    primary key (id)
);


SELECT * FROM users;