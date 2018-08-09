var db = require("../models");

module.exports = function(app) {
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

  app.post("/new/comment", function(req, res) {
    console.log(req.params);
    if(req.isAuthenticated()) {
      db.Comment.create({
        text: req.body.text,
        UserId: req.user.id,
        PostId: req.body.id
      });
    }
  });
};
