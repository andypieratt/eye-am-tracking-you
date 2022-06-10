//VARIABLES
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//SETTING DB/QUERY AVAILABILITY
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "wordpass",
    database: "workplace_db",
  },
  console.log("You are now connected to the workplace database")
);

const viewWorkplace = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do with your workplace?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
      name: "choice",
    },
  ]);
  if (choice === "view all departments") {
    viewAllDepartments();
  } else if (choice === "view all roles") {
    viewAllRoles();
  } else if (choice === "view all employees") {
    viewAllEmployees();
  } else if (choice === "add a department") {
    addDepartment();
  } else if (choice === "add a role") {
    addRole();
  } else if (choice === "add an employee") {
    addEmployee();
  }
};

//VIEW ALL DEPARTMENTS FUNCTION
const viewAllDepartments = async () => {
  const deptTable = await db.promise().query("SELECT * FROM department");
  console.table(deptTable[0]);
  viewWorkplace();
};

//VIEW ALL ROLES FUNCTION
const viewAllRoles = async () => {
  const roleTable = await db.promise().query("SELECT * FROM roles");
  console.table(roleTable[0]);
  viewWorkplace();
};

//VIEW ALL EMPLOYEES FUNCTION
const viewAllEmployees = async () => {
  const empTable = await db.promise().query("SELECT * FROM employees");
  console.table(empTable[0]);
};

//ADD FUNCTIONS
const addDepartment = async () => {
  const { title } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the title of the new department?",
      name: "title",
    },
  ]);
  const newDept = await db
    .promise()
    .query(`INSERT INTO department (name) VALUES ("${title}");`);
  const deptTable = await db.promise().query("SELECT * FROM department");
  console.table(deptTable[0]);
  viewWorkplace();
};

const addRole = async () => {
  const { response } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role you would like to add?",
      name: "name",
    },
    {
      type: "input",
      message: "What is this role's salary?",
      name: "salary",
    },
    {
      type: "input",
      message: "What department ID is this role under?",
      name: "deptId",
    },
  ]);
  const newRole = db
    .promise()
    .query(
      `INSERT INTO roles (title, salary, department_id) VALUES ("${response.name}"), ("${response.salary}"), (${response.deptId});`
    );
  const roleTable = await db.promise().query("SELECT * FROM employees");
  console.table(roleTable[0]);
  viewWorkplace();
};

//CALLING VIEW WORKPLACE
viewWorkplace();
