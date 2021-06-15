const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

const employee = require('./employee.js');
const department = require('./department.js');
const role = require('./role.js');

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
				'delete a department',
				'delete a role',
				new inquirer.Separator(), 
				'exit',
				new inquirer.Separator(),
				new inquirer.Separator(),
			],
			})
			.then((answer) => {
				switch (answer.effWannaDo) {
					case 'view all employees':
						employee.viewAllEmp();
						break;
					case 'view all departments':
						department.viewAllDepts();
						break;        
					case 'view all roles':
						role.viewAllRoles();
						break; 
					case 'add an employee':
						employee.addEmp();
						break; 
					case 'add a department':
						department.addDept();
						break; 
					case 'add a role':
						role.addRole();
						break; 
					case 'update an employee':
						employee.updateEmp();
						break;
					case 'delete an employee':
						employee.deleteEmp();
						break;
					case 'delete a department':
						department.deleteDept();
						break;
					case 'delete a role':
						role.deleteRole();
						break;
					case 'exit':
						connection.end();
						console.log('\nb y e  b y e\n')
						break;		
			
					default:
						console.log('invalid: bye bye')
						break;
				}
			});
};

module.exports.start = start;