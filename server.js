if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// const database = require("database.js")
// const users = database.users

const routes = require("./controllers/routes.js");
const express = require('express')
const server = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = [];


const PORT = process.env.PORT || 8080;

server.set('view-engine', 'ejs')
server.use(express.urlencoded({ extended: false }))
server.use(flash())
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride('_method'))
server.use(routes);



server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});