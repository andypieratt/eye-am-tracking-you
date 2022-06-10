//VARIABLES
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const PORT = process.env.PORT || 3001;

function viewWorkplace() {
  inquirer.prompt([
    {
      type: "list",
      message: "Which area of the workplace do you want to spy on?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    },
  ]);
}

function viewAllDepartments() {}
