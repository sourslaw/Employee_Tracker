const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

const connection = require('./config/connection.js')

const start = require('./lib/start.js');
  
// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start.start();
});