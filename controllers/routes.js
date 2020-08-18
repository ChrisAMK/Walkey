// Requiring all the need packages
const express = require("express");
const router = express.Router();
const user = require("../models/user-methods.js");

const users = [];

const bcrypt = require("bcrypt");
const passport = require("passport");


// Api route for Homepage Get request
router.get('/', checkAuthenticated, (request, response) => {
    response.render('index.handlebars', { name: request.user.name })
  })
  
  // Api route for Login Page Get request
  router.get('/login', checkNotAuthenticated, (request, response) => {
    response.render('login.handlebars')
  })
  
  // Api route for Login Page Post request -- Typically the user posting a login form of details
  router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  // Api route for Register Page Get request
  router.get('/register', checkNotAuthenticated, (request, response) => {
    response.render('register.handlebars')
  })
  
  // Api route for Register Page POST request
  router.post('/register', checkNotAuthenticated, async (request, response) => {
    try {
      // Hashed password variable, takes the request.body.password and hashes it for database entry TO BE ADDED CLOSER TO DEPLOYMENT
      const hashedPassword = await bcrypt.hash(request.body.password, 10)
      user.insertOne(["name, email, password"], [request.body.name, request.body.email, hashedPassword], function(result) {
        console.log(result)
      });
      // Redirect to login page once the user has submitted a Registration Form
      response.redirect('/login')
    // If there is an error, redirect to the register page, (essentially - Reload the page and try again)
    } catch {
      response.redirect('/register')
    }
  })

  // API DELETE Request on the Logout page
  router.delete('/logout', (request, response) => {
    request.logOut()
    response.redirect('/login')
  })

  // Helper Functions, to ensure correct log in details are passed in, Needs to be put in a seperate file later.
  function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
      return next()
    }
  
    response.redirect('/login')
  }
  
  function checkNotAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
      return response.redirect('/')
    }
    next()
  }

module.exports = router;