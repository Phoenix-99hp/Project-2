module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("home", { user: req.session.user });
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.session.user) {
      return res.redirect("/");
    }
    res.render("login", { error: req.session.error });
    req.session.error = "";
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.session.user) {
      return res.redirect("/");
    }
    res.render("signup", { error: req.session.error });
    req.session.error = "";
  });
};
