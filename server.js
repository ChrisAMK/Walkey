if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const express = require('express');
// const server = express();
// const passport = require('passport');
// const flash = require('express-flash');
// const session = require('express-session');
// const methodOverride = require('method-override');
// const initializePassport = require('./passport-config');
// const db = require("./models");
// /// Grabing all the users and passing them into the initialize Passport Function
// function updateUserListForPassport() {
//   var queryString = "SELECT * FROM users;";
//   connection.query(queryString, function (err, result) {
//     if (err) throw err;

//     initializePassport(
//       passport,
//       email => result.find(user => user.email === email),
//       id => result.find(user => user.id === id)
//     );
//   });
// }


// setInterval(updateUserListForPassport, 3000)



// Initializing passport to work with the provided database
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// );

// // Make shift database, working on MySQL asap -14/8/2020
// const users = [];

// Declaring the PORT
// const PORT = process.env.PORT || 8080;

// // Specifing that we are using the EJS view Engine - Needs to be changed to Handlebars
// server.set('view-engine', 'ejs');
// server.use(express.urlencoded({ extended: true }));
// server.use(express.json());
// server.use(express.static("public"));

// server.use(flash());
// server.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));
// server.use(passport.initialize());
// server.use(passport.session());
// server.use(methodOverride('_method'));
// // Telling the server to use the API routes specified in the required routes.js File
// // Requiring our routes
// require("./routes/html-routes.js")(server);
// require("./routes/api-routes.js")(server);


// // telling the server to start and listen for connections
// db.sequelize.sync().then(function () {
//   server.listen(PORT, function () {
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
// });


// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
