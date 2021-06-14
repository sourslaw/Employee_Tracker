const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});


const start = () => {
	inquirer
	        .prompt({
			name: 'effWannaDo',
			type: 'list',
			message: chalk.bold('select an action . . .'),
			choices: [
				'view all employees', 
				'view all departments', 
				'view all roles', 
				new inquirer.Separator(), 
				'add an employee',
				'add a department',
				'add a role',
				new inquirer.Separator(),
				'update an employee',
				new inquirer.Separator(), 
				'delete an employee',
				new inquirer.Separator(), 
				'exit',
				new inquirer.Separator(),
				new inquirer.Separator(),
			],
			})
			.then((answer) => {
				switch (answer.effWannaDo) {
					case 'view all employees':
						viewAllEmp();
						break;
					case 'view all departments':
						viewAllDepts();
						break;        
					case 'view all roles':
						viewAllRoles();
						break; 
					case 'add an employee':
						addEmp();
						break; 
					case 'add a department':
						addDept();
						break; 
					case 'add a role':
						addRole();
						break; 
					case 'update an employee':
						updateEmp();
						break;
					case 'delete an employee':
						deleteEmp();
						break;
					case 'exit':
						connection.end();
						console.log('bye bye')
						break;		
			
					default:
						console.log('invalid: bye bye')
						break;
				}
			});
};

// V I E W I N G
const viewAllEmp = () => {
	console.log( chalk.bold.cyan('\nV I E W I N G  all employees . . . \n') )

	connection.query('SELECT * FROM employee', (err, res) => {
		if (err) throw err;

		console.log( console.table(res) );
		
		start();
	});
};


const viewAllDepts = () => {
	console.log( chalk.bold.cyan('\nV I E W I N G  all departments . . . \n') );

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
                'SELECT employee.id, employee.last_name, employee.first_name, role.title, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?',
                [
					{
						'department.id': answer.choice,
					},
				],
                (err, res) => {
                    if (err) throw err;
					console.log( chalk.yellow('\nh e r e  are the results . . . \n') );
					console.table(res)
					console.log('\n')
					
					start();
                }
			);			
	  });
	})
};


const viewAllRoles = () => {
	console.log( chalk.bold.cyan('\nV I E W I N G  all roles . . . \n') )

	connection.query('SELECT * FROM role', (err, res) => {
		if (err) throw err;

		console.log( console.table(res) );
		
		start();
	});
};


// A D D I N G
const addEmp = () => {
	inquirer
        .prompt([
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
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                	manager_ID: answer.managerID,
                },
                (err) => {
                    if (err) throw err;
					console.log('\nthe employee has been a d d e d . . . \n');

					start();
                }
            );
        });
};

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

					start();
                }
            );
        });
};

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
                message: "enter the id of the role: ",
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

					start();
                }
            );
        });
};



// U P D A T I N G
const updateEmp = () => {
	console.log( chalk.bold.cyan('\nV I E W I N G  all current employees . . . \n') );

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
			{ // just prompts for this info again
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
					console.log('\nthe employee has been u p d a t e d . . . \n');

					start();
                }
			);			
	  });
	})
};

const deleteEmp = () => {
	console.log( chalk.bold.cyan('\nV I E W I N G  all current employees . . . \n') );

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
					console.log('\nthe employee has been d e l e t e d . . . \n');

					start();
                }
			);			
	  });
	})	
};
  

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});