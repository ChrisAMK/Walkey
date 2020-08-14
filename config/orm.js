const connection = require("./connection.js");

// Helper functions below, used inside the main functions that will be exported
const printQuestionMarks = (num) => {
    let array = [];
    for (let i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}
// Another Helper function that converts object KEY: Value to string KEY=Value, helpful for MySQL query syntax.
const objToSql = (object) => {
    var array = [];
    
    for (let key in object) {
        let value = object[key];

        if (Object.hasOwnProperty.call(object, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}

// Creating an Object that holds all the function to be exported
const orm = {
    // Creating a function that selects items from a table that is provided as a parameter
    selectAll: function(tableValue, callback) {
        // Query string is the actual MySQL query that will be modified with parameter variables
        var queryString = "SELECT * FROM " + tableValue + ";";
        connection.query(queryString, function(err, response) {
        if (err) throw err;
        // callback function returns the response from the MySQL Query
        callback(response);
        });
    },
    // This function replaces the INSERT INTO MySQL Function
    insertOne: function(table, columns, values, callback) {
        console.log("insertOne");
        let queryString = "INSERT INTO " + table;
        // Every parameter is added into the query string so it has the correct syntax
        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(values.length);
        queryString += ") ";
        // This is the MySQL query that uses the query string prepared
        connection.query(queryString, values, function(err, response) {
            if (err) throw err;
            callback(response);
        });
    },
    // This function is to replace the UPDATE MySQL Query
    updateOne: function(table, objectColumnKeyAndValue, condition, callback) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objectColumnKeyAndValue);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, response) {
            if (err) throw err;
            callback(response);
        });
    },
    // I added this delete function to delete a burger from the screen once devoured
    deleteOne: function(table, condition, callback) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
        connection.query(queryString, function(err, response) {
          if (err) throw err;
          callback(response);
        });
    }
}
// Exporting the Object to be used else where
module.exports = orm;