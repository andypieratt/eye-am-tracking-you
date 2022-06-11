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

//MAIN PROMPT
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
        "I'm done viewing the workplace",
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
  } else if (choice === "update an employee role") {
    updateEmpRole();
  } else if (choice === "I'm done viewing the workplace") {
    process.exit(0);
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
  viewWorkplace();
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
  const { roleName, salary, deptId } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role you would like to add?",
      name: "roleName",
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
  const newRole = await db
    .promise()
    .query(
      `INSERT INTO roles (title, salary, department_id) VALUES ("${roleName}", "${salary}", ${deptId});`
    );
  const roleTable = await db.promise().query("SELECT * FROM roles");
  console.table(roleTable[0]);
  viewWorkplace();
};

const addEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: "input",
      message: "What is this employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is this employee's last name?",
      name: "lastName",
    },
    {
      type: "input",
      message: "What is this employee's role ID?",
      name: "roleId",
    },
    {
      type: "input",
      message: "Who is this employees manager if they have one?",
      name: "managerId",
    },
  ]);
  const newEmployee = await db
    .promise()
    .query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId});`
    );
  const empTable = await db.promise().query("SELECT * FROM employees");
  console.table(empTable[0]);
  viewWorkplace();
};

//UPDATE FUNCTIONS
const updateEmpRole = async () => {
  const { empId, newRole } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's ID?",
      name: "empId",
    },
    {
      type: "input",
      message: "What is the new role ID for this employee?",
      name: "newRole",
    },
  ]);
  const newEmpRole = await db
    .promise()
    .query(
      `UPDATE employees SET role_id = "${newRole}" WHERE employees.id = ${empId} `
    );
  const empTable = await db.promise().query("SELECT * FROM employees");
  console.table(empTable[0]);
  viewWorkplace();
};

//CALLING VIEW WORKPLACE
viewWorkplace();
