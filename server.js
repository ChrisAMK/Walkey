if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Requiring all needed packages and files
const routes = require("./controllers/routes.js");
const express = require('express');
const server = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const expressHandlebars = require("express-handlebars");
const methodOverride = require('method-override');
const serverFunction = require("./controllers/server-functions.js");

// Updating the passport with current users
setInterval(serverFunction.updateUserListForPassport, 3000);

// Declaring the PORT
const PORT = process.env.PORT || 8080;

server.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

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
server.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});