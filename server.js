const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
// Add near the top of the file
const apiRoutes = require('./routes');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const inputCheck = require('./utils/inputCheck');


// Add after Express middleware
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});