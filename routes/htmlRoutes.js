var db = require("../models");

module.exports = function (app) {
  // Load Post Page
  app.get("/post", function (req, res) {
    if (req.isAuthenticated()) {
      res.render("post", {
        title: "Post.it",
        msg: "Post Creation",
      });
    } else {
      res.send("You need to be logged in");
    }
  });

  app.get("/author", function (req, res) {
    if (req.isAuthenticated()) {
      res.render("author", {
        title: "Post.it",
        msg: "Author Creation",
        username: req.user.username
      });
    } else {
      res.render("author", {
        title: "Post.it",
        msg: "Author Creation",
      });
    }
    console.log(req.user);
  });


  app.get("/category", function (req, res) {
    res.render("category", {
      msg: "Post a new category!"
    });
  });


  app.get("/success", function (req, res) {
    res.send("Success!");
  });

  app.get("/failure", function (req, res) {
    res.send("failure");
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  //   console.log(req.isAuthenticated());
  // });
};

