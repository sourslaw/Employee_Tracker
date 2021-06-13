const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,
    // Your username
    user: 'root',
    password: 'Standard220',
    database: 'emp_trackerDB',
});


const start = () => {
	inquirer
	        .prompt({
		name: 'effWannaDo',
		type: 'list',
		message: 'select an action . . .',
		choices: ['view all employees', 'view all employees by department', 'view all employees by manager', new inquirer.Separator(), 'add an employee', 'update an employee', 'delete an employee', 'exit'],
	    })
	    .then((answer) => {
			switch (answer.effWannaDo) {
		        case 'view all employees':
					viewAllEmp();
					break;
		        case 'view all employees by department':
					viewEmpDept();
					break;        
		        case 'view all employees by manager':
					viewEmpMang();
					break; 
		        case 'add an employee':
					addEmp();
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

const viewAllEmp = () => {
	console.log('v i e w i n g employees . . .')

	connection.query('SELECT * FROM employee', (err, res) => {
		if (err) throw err;

		console.log( console.table(res) );
		
		start();
	});
};

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
					console.log('an employee has been a d d e d . . .');
					// re-prompt user
					start();
                }
            );
        });
};

const updateEmp = () => {
	console.log('here are the current employees . . .');

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
			  message: 'select the id of the employee you would like to update?',
			},
            { // just prompts for this info again
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
					console.log('an employee has been updated . . .');
					// re-prompt user
					start();
                }
			);			
	  });
	})
};

const deleteEmp = () => {
	console.log('in the deleting part: here the current employees  . . .');

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
			  message: 'select the id of the employee you would like to delete?',
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
					console.log('an employee has been deleted. . .');
					// re-prompt user
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