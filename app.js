//const inquirer = require('inquirer');
import inquirer from "inquirer"
// const mysql = require("mysql2");
import mysql from "mysql2"
// const inputCheck = require('./utils/inputCheck');
//import inputCheck from "./utils/inputCheck"
import ctable from "console.table"
//import inputCheck from "./utils/inputCheck";
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: 'x',
    database: 'workplace'
});

const viewDepts = () => {

    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            console.table(rows)
            promptUser()
        }
    });

}

const inputCheck = (obj, ...props) => {
    const errors = [];

    props.forEach(prop => {
        // if property is blank or doesn't exist, add to errors array
        if (obj[prop] === undefined || obj[prop] === '') {
            errors.push(`No ${prop} specified.`);
        }
    });

    if (errors.length) {
        return {
            error: errors.join(' ')
        };
    }

    return null;
};

const viewRoles = () => {

    const sql = `SELECT * FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            console.table(rows)
            promptUser()
        }
    });

}

const managedEmployee = () => {
    const sql =
        `SELECT employees.id AS employee_id, employees.first_name AS employee_first_name, employees.last_name AS employee_last_name,  x.id AS manager_id , x.first_name AS manager_first_name, x.last_name AS manager_last_name
        FROM employees INNER JOIN employees AS x
        ON employees.manager_id = x.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            console.table(rows)
            promptUser()
        }
    });
}

const viewEmployees = () => {

    const sql =

        `SELECT * FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            console.table(rows)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeNext',
                    message: 'What would you like to do next?',
                    choices: ['Return to Menu', 'See Managed Employees'],
                }
            ])
                .then(choice => {
                    console.log(choice.next)
                    if (choice.employeeNext === 'Return to Menu') {
                        promptUser()
                    }
                    if (choice.employeeNext === 'See Managed Employees') {
                        managedEmployee()
                    }
                })

        }
    });
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is their role? 1 = regional manager, 2 = local manager, 3 = intern',
                choices: ['1', '2', '3']
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Who is their manager? 1 = Ronald Firbank, 2 = Virginia Woolf',
                choices: ['1', '2']
            }
        ])
        .then(newEmployee => {
            //console.log(newEmployee)
            const errors = inputCheck(
                newEmployee,
                'first_name',
                'last_name',
                'manager_id',
                'role_id'
            );
            if (errors) {
                throw errors;
            }
            if (!errors) {

                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                const params = [
                    newEmployee.first_name,
                    newEmployee.last_name,
                    newEmployee.role_id,
                    newEmployee.manager_id
                ];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        viewEmployees(result)
                        promptUser()
                    }
                });
            }
        });
};

const addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name_',
                message: "What is the name of teh department?",
            },
        ])
        .then(newDept => {
            //console.log(newEmployee)
            const errors = inputCheck(
                newDept,
                'name_',
            );
            if (errors) {
                throw errors;
            }
            if (!errors) {

                const sql = `INSERT INTO departments (name_) VALUES (?)`;
                const params = [
                    newDept.name_
                ];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        viewDepts(result)
                        promptUser()
                    }
                });
            }
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the title of the role?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?(xxxxx.xx format only)",
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What department is this under? 1 = Finance, 2 = Business, 3 = Retail',
                choices: ['1', '2', '3']
            }
        ])
        .then(newRole => {
            //console.log(newEmployee)
            const errors = inputCheck(
                newRole,
                'title',
                'salary',
                'department_id'
            );
            if (errors) {
                throw errors;
            }
            if (!errors) {

                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                const params = [
                    newRole.title,
                    newRole.salary,
                    newRole.department_id
                ];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        viewRoles(result)
                        promptUser()
                    }
                });
            }
        });
};





// const sql = `SELECT * FROM departments`;

// db.query(sql, (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     else {
//         console.table(rows)
//         promptUser()
//     }
// });




const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'next',
            message: 'What did you like to do?',
            choices: ['View All Employees', 'Add Employee',
                'Update Employee', 'View All Roles', 'Add Role',
                'View All Departments', 'Add Department', 'Quit'],

        }
    ])
        .then(choice => {
            console.log(choice.next)
            if (choice.next === 'View All Departments') {
                viewDepts()
            }
            if (choice.next === 'View All Roles') {
                viewRoles()
            }
            if (choice.next === 'View All Employees') {
                viewEmployees()
            }
            if (choice.next === 'Add Department') {
                addDept()
            }
            if (choice.next === 'Add Role') {
                addRole()
            }
            if (choice.next === 'Add Employee') {
                addEmployee()
            }
            if (choice.next === 'Update Employee') {
                updateEmployee()
            }
            if (choice.next === 'Quit') {
                Quit()
            }
        })

};

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    // 
    promptUser();
});