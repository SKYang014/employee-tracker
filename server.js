const mysql = require("mysql2");
const express = require('express');
const PORT = process.env.PORT || 3001;
//const app = express();
//const db = require('./db/connection');
// Add near the top of the file
const apiRoutes = require('./routes');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const inputCheck = require('./utils/inputCheck');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: 'x',
    database: 'workplace'
});

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

// View all employees
// app.get('/api/employees', (req, res) => {
//     const sql = `SELECT * FROM employees`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// // Create an employee
// app.post('/api/employee', ({ body }, res) => {

//     const errors = inputCheck(
//         body,
//         'first_name',
//         'last_name',
//         'manager_id',
//         'role_id'
//     );
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?,?,?,?)`;
//     const params = [
//         body.first_name,
//         body.last_name,
//         body.manager_id,
//         body.role_id
//     ];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body,
//             changes: result.affectedRows
//         });
//     });
// });

// Update an Employee 
// app.put('/api/employee/:id', (req, res) => {

//     const errors = inputCheck(
//         req.body,
//         'first_name',
//         'last_name',
//         'manager_id',
//         'role_id'
//     );
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `UPDATE employees SET 
//                     first_name = ? last_name = ? manager_id = ? role_id = ? 
//                     WHERE id = ?`;
//     const params = [req.params.id, req.body.first_name, req.body.last_name, req.body.manager_id, req.params.role_id];
//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             // check if a record was found
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Employee not found'
//             });
//         } else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.affectedRows
//             });
//         }
//     });
// });


// // Get all departments
// app.get('/api/departments', (req, res) => {
//     const sql = `SELECT * FROM departments`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });




// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});