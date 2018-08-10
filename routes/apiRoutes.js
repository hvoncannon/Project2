var db = require("../models");

module.exports = function (app) {
  app.post("/new/post", function (req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      content: req.body.text,
      CategoryId: req.body.category,
      upvotes: 0,
      downvotes: 0,
      UserId: req.user.id
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/new/category", function (req, res) {
    db.Categories.findOrCreate({
      where: { name: req.body.categoryName },
      defaults: { name: req.body.categoryName, description: req.body.categoryDescription }
    }).then(function (dbCategories) {
      res.json(dbCategories);
      // isNew = result[1];
      // console.log(isNew);
      //if isNew is false, the category already exists
    });
  });

  app.post("/new/comment", function (req, res) {
    console.log(req.params);
    if (req.isAuthenticated()) {
      db.Comment.create({
        text: req.body.text,
        UserId: req.user.id,
        PostId: req.body.id
      }).then(function (dbComment) {
        res.json(dbComment);
      });
    }
  });

  app.post("/upvote", function (req, res) {
    if (req.isAuthenticated()) {
      console.log("!!!!!!");
      db.Post.increment(
        { upvotes: 1 },
        { where: { id: req.body.id } }
      ).then(function (rowsUpdated) {
        res.json(rowsUpdated);
      });
    } else {
      res.send("Need to log in");
    }
  });

  app.post("/downvote", function (req, res) {
    if (req.isAuthenticated()) {
      db.Post.increment(
        { downvotes: 1 },
        { where: { id: req.body.id } }
      ).then(function (rowsUpdated) {
        res.json(rowsUpdated);
      });
    } else {
      res.send("Need to log in");
    }
  });
};