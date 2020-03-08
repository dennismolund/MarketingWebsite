-- Create a table to store user accounts in.

CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	email VARCHAR(50),
	CONSTRAINT usernameUnique UNIQUE (username)
);

CREATE TABLE gbPosts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	message VARCHAR(600) NOT NULL
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "abc123");

-- Dummy blogpost for testing
INSERT INTO gbPosts (username, message) VALUES ("Alice", "This is the first blogpost");