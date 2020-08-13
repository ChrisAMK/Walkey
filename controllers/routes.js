// Requiring all the need packages
const express = require("express");
const router = express.Router();

const users = [];

const bcrypt = require("bcrypt");
const passport = require("passport");
// const users = require("./database.js")


router.get('/', checkAuthenticated, (request, response) => {
    response.render('index.ejs', { name: request.user.name })
  })
  
  router.get('/login', checkNotAuthenticated, (request, response) => {
    response.render('login.ejs')
  })
  
  router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  router.get('/register', checkNotAuthenticated, (request, response) => {
    response.render('register.ejs')
  })
  
  router.post('/register', checkNotAuthenticated, async (request, response) => {
    try {
        console.log(users)
      const hashedPassword = await bcrypt.hash(request.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
      })
      console.log(users)
      response.redirect('/login')
    } catch {
      response.redirect('/register')
    }
  })

  router.delete('/logout', (request, response) => {
    request.logOut()
    response.redirect('/login')
  })
  
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