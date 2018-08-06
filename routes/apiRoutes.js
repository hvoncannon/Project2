var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
    // });
  });

  app.post("/new/post", function(req, res) {
    console.log(req.body.title);
    db.Post.create({
      title: req.body.title,
      content: req.body.description
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
