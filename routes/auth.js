var authController = require("../controllers/authcontroller");

module.exports = function (app, passport) {
  app.get("/signup", authController.signup);
  app.get("/logout", function (req, res) {
    console.log("test");
    req.session.destroy(function (err) {
      if (err) throw err;
      res.redirect("/");
      console.log("test");
    });
  });

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/author",
    failureFlash: true
  }, console.log("test")));

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/author",
    failureFlash: true
  }
  ));
};