const mysql = require("mysql");
// Defining the database connection details
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Bootcamp2020",
        database: "walke"
    });
}

// Connecting to the database with a connect funtion
connection.connect();
// Exporting the connection variable to be used elsewhere
module.exports = connection;