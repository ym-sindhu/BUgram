const mysql = require('mysql2');
require('dotenv').config();

// A pool of connections is used for maximum effieciency
// the credentails are stored in a .env file so they get ignored when oushing to github
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false 
    },
}).promise(); 

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL Database!');
});

module.exports = connection;
