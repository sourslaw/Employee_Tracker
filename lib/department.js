const connection = require('../config/connection.js')
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');

const start = require('./start.js');

// viewing all d e p a r t m e n t s
const viewAllDepts = () => {
	console.log( chalk.bold.yellow('\nV I E W I N G  all departments . . . \n') );

	connection.query('SELECT * FROM department', (err, results) => {
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
			  message: 'select the id of the department you would like to view . . . ',
			}
		  ])
		  .then((answer) => {
			connection.query(
                'SELECT employee.id, employee.role_id, employee.manager_id, employee.last_name, employee.first_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?',
                [
					{
						'department.id': answer.choice,
					},
				],
                (err, res) => {
                    if (err) throw err;
					console.log( chalk.yellow('\nh e r e  are the results of the selected department . . . \n') );
					console.table(res)
					console.log('\n')
					
					start.start();
                }
			);			
	  });
	})
};

// a d d i n g department
const addDept = () => {
	inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: "enter the id of the department: ",
            },
            {
                name: 'name',
                type: 'input',
                message: "enter the name of the department: ",
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    id: answer.id,
                    name: answer.name,
                },
                (err) => {
                    if (err) throw err;
					console.log('\nthe department has been c r e a t e d . . . \n');

					start.start();
                }
            );
        });
};

module.exports = { viewAllDepts, addDept };