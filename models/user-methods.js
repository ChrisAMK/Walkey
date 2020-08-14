const orm = require("../config/orm.js");
// Creating a variable that uses the functions from the ORM, gives the functions parameter names, ready to be used
const user = {
    selectAll: function(callback) {
        orm.selectAll("users", function(response) {
            callback(response);
        })
    },
    insertOne: function(columns, values, callback) {
        orm.insertOne("users", columns, values, function(response) {
            callback(response);
        });
    },
    updateOne: function(objectColumnKeyAndValue, condition, callback) {
        orm.updateOne("users", objectColumnKeyAndValue, condition, function(response) {
            callback(response);
        });
    },
    deleteOne: function(condition, callback) {
        orm.deleteOne("users", condition, function(response) {
            callback(response);
        });
    }
};

module.exports = user;