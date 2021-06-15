const connection = require('../config/connection.js')
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');

const start = require('./start.js');

// viewing all E M P L O Y E E S
const viewAllEmp = () => {
	console.log( chalk.bold.cyan('\nV I E W I N G  all employees . . . \n') )

	connection.query('SELECT employee.id, employee.role_id, employee.manager_id, employee.last_name, employee.first_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id;', (err, res) => {
		if (err) throw err;

		console.table(res);
		
		start.start();
	});
};

// A D D I N G employee
const addEmp = () => {
	inquirer
        .prompt([
			{
                name: 'id',
                type: 'input',
                message: "enter the employee's ID: ",
            },
            {
                name: 'firstName',
                type: 'input',
                message: "enter the employee's first name: ",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "enter the employee's last name: ",
            },
            {
                name: 'roleID',
                type: 'input',
                message: "enter the employee's role ID: ",
			},
			{
                name: 'managerID',
                type: 'input',
                message: "enter the employee's manager's ID: ",
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
					id: answer.id,
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                	manager_ID: answer.managerID,
                },
                (err) => {
                    if (err) throw err;
					console.log('\nthe employee has been a d d e d . . . \n');

					start.start();
                }
            );
        });
};
// U P D A T I N G
// e m p l o y e e s
const updateEmp = () => {
	console.log( chalk.bold.yellow('\nV I E W I N G  all current employees . . . \n') );

	connection.query('SELECT * FROM employee', (err, results) => {
		if (err) throw err;
		inquirer
		  .prompt([
			{
			  name: 'choice',
			  type: 'list',
			  choices() {
				const choiceArray = [];

				results.forEach((person) => {
				  choiceArray.push(person.id);
				});

				console.table(results)
				
				return choiceArray;
			  },
			  message: 'select the id of the employee you would like to update . . . ',
			},
			{ 
                name: 'id',
                type: 'input',
                message: "enter the employee's id number: ",
            },
            { 
                name: 'firstName',
                type: 'input',
                message: "enter the employee's first name: ",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "enter the employee's last name: ",
            },
            {
                name: 'roleID',
                type: 'input',
                message: "enter the employee's role ID: ",
			},
			{
                name: 'managerID',
                type: 'input',
                message: "enter the employee's manager's ID: ",
            },
		  ])
		  .then((answer) => {
			connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
					{
						id: answer.id,
						first_name: answer.firstName,
						last_name: answer.lastName,
						role_id: answer.roleID,
						manager_ID: answer.managerID,
					},
					{
						id: answer.choice
					},
				],
                (err) => {
                    if (err) throw err;
					console.log( chalk.yellow('\nthe employee has been u p d a t e d . . . \n') );

					start.start();
                }
			);			
	  });
	})
};
// D E L E T I N G
// e m p l o y e e s
const deleteEmp = () => {
	console.log( chalk.bold.red('\nV I E W I N G  all current employees available for DELETION . . . \n') );

	connection.query('SELECT * FROM employee', (err, results) => {
		if (err) throw err;
		inquirer
		  .prompt([
			{
			  name: 'choice',
			  type: 'list',
			  choices() {
				const choiceArray = [];

				results.forEach((person) => {
				  choiceArray.push(person.id);
				});

				console.table(results)
				
				return choiceArray;
			  },
			  message: 'select the id of the employee you would like to delete . . . ',
			},
		  ])
		  .then((answer) => {
			connection.query(
                'DELETE FROM employee WHERE ?',
                [
					{
						id: answer.choice
					},
				],
                (err) => {
                    if (err) throw err;
					console.log( chalk.red('\nthe employee has been d e l e t e d . . . \n') );

					start.start();
                }
			);			
	  });
	})	
};

module.exports = { viewAllEmp, addEmp, updateEmp, deleteEmp };