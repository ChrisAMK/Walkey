// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  app.post("/api/register", function(req, res) {
    console.log(req.body);
    console.log(req.body.password);


    const hashedPassword = bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err)
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};





// // Requiring all the need packages
// const express = require("express");
// const router = express.Router();
// const user = require("../models/user-methods.js");

// const users = [];

// const bcrypt = require("bcrypt");
// const passport = require("passport");


// // Api route for Homepage Get request
// router.get('/', checkAuthenticated, (request, response) => {
//     response.render('index.ejs', { name: request.user.name })
//   })
  
//   // Api route for Login Page Get request
//   router.get('/login', checkNotAuthenticated, (request, response) => {
//     response.render('login.ejs')
//   })
  
//   // Api route for Login Page Post request -- Typically the user posting a login form of details
//   router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }))
  
//   // Api route for Register Page Get request
//   router.get('/register', checkNotAuthenticated, (request, response) => {
//     response.render('register.ejs')
//   })
  
//   // Api route for Register Page POST request
//   // API DELETE Request on the Logout page
//   router.delete('/logout', (request, response) => {
//     request.logOut()
//     response.redirect('/login')
//   })

//   // Helper Functions, to ensure correct log in details are passed in, Needs to be put in a seperate file later.
//   function checkAuthenticated(request, response, next) {
//     if (request.isAuthenticated()) {
//       return next()
//     }
  
//     response.redirect('/login')
//   }
  
//   function checkNotAuthenticated(request, response, next) {
//     if (request.isAuthenticated()) {
//       return response.redirect('/')
//     }
//     next()
//   }

// module.exports = router;