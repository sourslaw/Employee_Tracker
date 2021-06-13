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
		choices: ['view all employees', 'view all employees by department', 'view all employees by manager', 'add an employee', 'update an employee', 'delete an employee', 'exit'],
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
				// console.log(`invalid action: ${answer.action}`);
				// connection.end();
					console.log('invalid: bye bye')
					break;
			}
	    });
};

const viewAllEmp = () => {
	console.log('v i e w i n g employees . . .')

	connection.query('SELECT * FROM employee', (err, res) => {
		if (err) throw err;

		console.log(res);
		
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
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO employee SET ?',
                // QUESTION: What does the || 0 do?
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
	console.log('in the update bit . . .');

	connection.query('SELECT * FROM employee', (err, results) => {
		if (err) throw err;
		// once you have the items, prompt the user for which they'd like to bid on
		inquirer
		  .prompt([
			{
			  name: 'choice',
			  type: 'rawlist',
			  choices() {
				const choiceArray = [];

				// results.forEach(({ id, first_name }) => {
				//   choiceArray.push(id, first_name);
				// });
				results.forEach((person) => {
				  choiceArray.push(person.id);
				});
				
				// console.log(person.id);
				return choiceArray;
			  },
			  message: 'who would you like to update?',
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
			// get the information of the chosen item
			connection.query(
                'UPDATE employee SET ? WHERE ?',
                // QUESTION: What does the || 0 do?
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
	console.log('in the deleting part');

	connection.query('SELECT * FROM employee', (err, results) => {
		if (err) throw err;
		// once you have the items, prompt the user for which they'd like to bid on
		inquirer
		  .prompt([
			{
			  name: 'choice',
			  type: 'rawlist',
			  choices() {
				const choiceArray = [];

				// results.forEach(({ id, first_name }) => {
				//   choiceArray.push(id, first_name);
				// });
				results.forEach((person) => {
				  choiceArray.push(person.id);
				});
				
				// console.log(person.id);
				return choiceArray;
			  },
			  message: 'who would you like to delete?',
			},
		  ])
		  .then((answer) => {
			// get the information of the chosen item
			connection.query(
                'DELETE FROM employee WHERE ?',
                // QUESTION: What does the || 0 do?
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