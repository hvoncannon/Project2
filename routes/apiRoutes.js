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
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      content: req.body.text,
      CategoryId: req.body.category,
      upvotes: 0,
      downvotes: 0,
      UserId: req.user.id
    });
  });

  app.post("/new/category", function(req, res) {
    db.Categories.findOrCreate({
      where: { name: req.body.categoryName },
      defaults: {name: req.body.categoryName, description: req.body.categoryDescription}
    }).then(function(result) {
      isNew = result[1];
      console.log(isNew);
      //if isNew is false, the category already exists
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
