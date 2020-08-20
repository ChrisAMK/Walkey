/// Grabing all the users and passing them into the initialize Passport Function
const initializePassport = require('../passport-config');
const passport = require('passport');

const serverFunctions = {
    updateUserListForPassport: function() {
        var queryString = "SELECT * FROM users;";
        connection.query(queryString, function (err, result) {
        if (err) throw err;
  
        initializePassport(
        passport,
        email => result.find(user => user.email === email),
        id => result.find(user => user.id === id)
      );
    });
    }
}


module.exports = serverFunctions