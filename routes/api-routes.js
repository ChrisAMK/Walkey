var db = require("../models");
var passport = require("../config/passport");
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  //  Dog Owner Login
  app.post("/api/dog-owner-login", passport.authenticate("local"), function (
    req,
    res
  ) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/dog-owner");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/dog-owner-signup", function (req, res) {
    console.log("api log", req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      addressOne: req.body.addressOne,
      addressTwo: req.body.addressTwo,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    })
      .then(function () {
        res.redirect(307, "/api/dog-owner-login");
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName
      });
    }
  });

  /*  app.post("/api/dog-form", function(req, res) {
    console.log("dog form post request log", req.body);
    db.Dog.create({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      sex: req.body.sex,
      weight: req.body.weight,
      UserId: req.user.id
    })
      .then(function () {
        res.redirect(307, "/api/dog-owner-login");
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  }); */

  // Dog Walk POST Route
  app.post("/api/walks", function (req, res) {
    console.log(req.body);
    console.log(JSON.stringify(req.body.activity));
    console.log(req.body["activity[0][activity]"]);
    db.Walk.create({
      time: req.body.time,
      activity: req.body.activity,
      UserId: req.user.id,
      DogId: req.body.dogId,
      note: req.body.note
    })
      .then(function (results) {
        res.json(results);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Notes GET route
  app.get("/api/notes", function (req, res) {
    db.Walk.findAll({
      where: {
        id: req.user.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // Get all dogs data
  app.get("/api/dog_data", function (req, res) {
    db.Dog.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // Get all walks data
  app.get("/api/walks", function (req, res) {
    db.Walk.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // Get individual dog walk data
  app.get("/api/walks/:dogId", function (req, res) {
    db.Walk.findAll({
      where: {
        DogId: req.params.dogId
      }
    }).then(function (results) {
      console.log("dog walk stats", results);
      res.json(results);
    });
  });

  // Get individual dog data
   app.get("/api/dog_data/:dogId", function(req, res) {
    db.Dog.findOne({
      where: {
        id: req.params.dogId
      }
      // include walk tabel?
    }).then(function(results) {
      console.log(results);
      res.json(results);
    });
  }); 

  //get all the dog information from the form and put it in the database
  app.post("/profile", upload.single("dogImg"), function (req, res, next) {
    db.Dog.create({
      // req.body has all the text information on it
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      sex: req.body.sex,
      weight: req.body.weight,
      // req.file has the uploaded file on it
      image: "/uploads/" + req.file.filename,
      UserId: req.user.id
    })
      .then(function () {
        console.log("hello________________________________________ /n");
        res.redirect("/dog-owner");

      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  app.post("/edit", upload.single("dogImg"), function (req, res, next) {
    db.Dog.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // Delete a dog by its id
  app.delete("/api/dog_data/:id", function (req, res) {
    db.Dog.destroy({ where: { id: req.params.id } }).then(function (results) {
      res.json(results);
    });
  });

  // PUT route for updating dogs
  app.put("/api/dog_data/:id", function (req, res) {
    db.Dog.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });
};