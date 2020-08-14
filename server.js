if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const routes = require("./controllers/routes.js");
const connection = require("./config/connection.js");
const express = require('express');
const server = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const initializePassport = require('./passport-config');

/// Grabing all the users and passing them into the initialize Passport Function
function updateUserListForPassport() {
  var queryString = "SELECT * FROM users;";
  connection.query(queryString, function(err, result) {
      if (err) throw err;

      initializePassport(
          passport,
          email => result.find(user => user.email === email),
          id => result.find(user => user.id === id)
        );
      });
}


setInterval(updateUserListForPassport, 3000)



// Initializing passport to work with the provided database
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// );

// // Make shift database, working on MySQL asap -14/8/2020
// const users = [];

// Declaring the PORT
const PORT = process.env.PORT || 8080;

// Specifing that we are using the EJS view Engine - Needs to be changed to Handlebars
server.set('view-engine', 'ejs');
server.use(express.urlencoded({ extended: false }));
server.use(flash());
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(methodOverride('_method'));
// Telling the server to use the API routes specified in the required routes.js File
server.use(routes);


// telling the server to start and listen for connections
server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});