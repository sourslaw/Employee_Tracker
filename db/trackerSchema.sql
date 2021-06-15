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
    id INT NOT NULL,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT NULL,
    PRIMARY KEY (id)
);


INSERT INTO department (id, name)
VALUES (0, 'ceo'), (1, 'development'), (2, 'programs'), (3, 'marketing'), (4, 'hr');

INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'ceo', 150000.00, 0);
INSERT INTO role (id, title, salary, department_id)
VALUES (110, 'development director', 90000.00, 1), (120, 'development associate', 75000.00, 1), (130, 'development intern', 25000.00, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (210, 'programs director', 90000.00, 2), (220, 'programs associate', 75000.00, 2), (230, 'programs intern', 25000.00, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (310, 'marketing director', 90000.00, 3), (315, 'ads manager', 82000.00, 3), (320, 'digital marketing associate', 75000.00, 3), (330, 'marketing intern', 25000.00, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (410, 'hr director', 90000.00, 4), (415, 'hiring manager', 65000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'elijah', 'lewis', 10, 10);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (111001, 'emma', 'white', 110, 10), (112002, 'liam', 'hernandez', 120, 111001), (112003, 'mia', 'martin', 120, 111001), (113004, 'evelyn', 'moore', 130, 112003);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (221001, 'harper', 'thompson', 210, 10), (222002, 'ava', 'lee', 220, 221001), (223003, 'noah', 'gonzalez', 230, 222002);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (331002, 'amelia', 'harris', 310, 10), (331501, 'benjamin', 'clark', 315, 331002), (332001, 'charlotte', 'robinson', 320, 331501), (333005, 'lucas', 'hillard', 330, 332001);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (441002, 'sophia', 'hall', 410, 10), (441501, 'james', 'smith', 415, 441002);