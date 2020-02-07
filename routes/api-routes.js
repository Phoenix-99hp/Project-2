// Requiring our models and passport as we've configured it
var db = require("../models");
// var passport = require("../config/passport");

module.exports = function (app) {
  // Post route for saving new person to Peoples table
  app.post("/api/official", function (req, res) {
    if (req.body.name === db.Person.name) {
      return res.status(400).send({
        message: "This person already in Database"
      });
    }
    db.Person.create({
      name: req.body.name
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  // Get route
  app.get("/api/official/:name", function (req, res) {

    db.Person.findOne({
      where: {
        name: req.params.name
      },
      include: [db.Comment]
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  // app.get("/api/comments/:id", function(req, res) {
  //   db.Person.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Comments]
  //   }).then(function(dbProject) {
  //     res.json(dbProject);
  //   });
  // });

  // POST route for saving a new comments

  // Drake's code
  // app.post("/api/comments", function (req, res) {
  //   db.Comment.create(req.body).then(function (dbComment) {
  //     res.json(dbComment);
  //   });
  // });

  // Bek's code
  app.post("/api/comments", function (req, res) {
    if (!req.body.body) {
      return res.status(400).send({
        message: "Body shouldn't be empty!"
      });
    }
    db.Comment.create({
      body: req.body.body,
      PersonId: req.body.PersonId
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });










  // DELETE route for deleting comments
  // WIP
  // app.delete("/api/official/:id", function(req, res) {
  //   db.Person.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbProject) {
  //     res.json(dbProject);
  //   });
  // });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //   res.json(req.user);
  // });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  // app.post("/api/signup", function(req, res) {
  //   db.User.create({
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //     .then(function() {
  //       res.redirect(307, "/api/login");
  //     })
  //     .catch(function(err) {
  //       res.status(401).json(err);
  //     });
  // });

  // Route for logging user out
  // app.get("/logout", function(req, res) {
  //   req.logout();
  //   res.redirect("/");
  // });

  // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", function(req, res) {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });
};
