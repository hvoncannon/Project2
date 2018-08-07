var authController = require("../controllers/authcontroller");

module.exports = function (app, passport) {
  app.get("/signup", authController.signup);
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
      console.log("test");
    });
  });

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/success",
    failureRedirect: "/failure"
  }, console.log("test")));

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/success",
    failureRedirect: "/failure"
  }, console.log("test")
  ));
};