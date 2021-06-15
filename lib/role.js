const connection = require('../config/connection.js')
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');

const start = require('./start.js');

// viewing r o l e s
const viewAllRoles = () => {
	console.log( chalk.bold.yellow('\nV I E W I N G  all roles . . . \n') );

	connection.query('SELECT * FROM role', (err, results) => {
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

				console.table(results);
				
				return choiceArray;
			  },
			  message: 'select the id of the role you would like to view . . . ',
			}
		  ])
		  .then((answer) => {
			connection.query(
                'SELECT employee.id, employee.role_id, employee.manager_id, employee.last_name, employee.first_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?',
                [
					{
						'role.id': answer.choice,
					},
				],
                (err, res) => {
                    if (err) throw err;
					console.log( chalk.yellow('\nh e r e  are the results of the selected role . . . \n') );
					console.table(res)
					console.log('\n')
					
					start.start();
                }
			);			
	  });
	})
};
// a d d i n g roles
const addRole = () => {
	inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: "enter the id of the role: ",
            },
            {
                name: 'title',
                type: 'input',
                message: "enter the title of the role: ",
			},
			{
                name: 'salary',
                type: 'input',
                message: "enter the salary of the role: ",
			},
			{
                name: 'departmentId',
                type: 'input',
                message: "enter the department id of the role: ",
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    id: answer.id,
					title: answer.title,
					salary: answer.salary,
					department_id: answer.departmentId
                },
                (err) => {
                    if (err) throw err;
					console.log('\nthe role has been c r e a t e d . . . \n');

					start.start();
                }
            );
        });
};

module.exports = { viewAllRoles, addRole };