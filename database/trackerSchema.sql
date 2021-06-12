DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;


CREATE TABLE department (
    id INT NOT NULL,
	name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(8,2) NOT NULL,
	department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT NULL,
    PRIMARY KEY (id)
);


INSERT INTO department (id, name)
VALUES ();

INSERT INTO role (id, title, salary, department_id
VALUES ();

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
