var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/post", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("post", {
        title: "Post.it",
        msg: "Post Creation",
        examples: dbExamples
      });
    });
  });

  app.get("/author", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("author", {
        title: "Post.it",
        msg: "Author Creation",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
