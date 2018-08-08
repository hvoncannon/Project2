var db = require("../models");

module.exports = function (app) {
  app.get("/", function(req, res) {
    var postsArr = [];
    db.Post.findAll(
      {
        // This include joins based off of the user id and only selects the column 'username'
        // so that the server doesn't have to access the password and such
        include: [
          {
            model: db.User,
            attributes: ["username"]
          }
        ]
      }).then(function (dbPost) {
      for(var i = 0; i < dbPost.length; i++) {
        postsArr.push(dbPost[i].dataValues);
      }
      // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
      if (req.isAuthenticated()) {
        res.render("index", {
          posts: postsArr,
          username: req.user.username,
        });
      } else {
        res.render("index", {
          posts: postsArr
        });
      }
    });
  });
  // Load Post Page
  app.get("/post", function (req, res) {
    //empty array to place category objects in to display in dropdown when creating post
    var cats = [];
    //db call to get categories
    db.Categories.findAll({}).then(function (dbCategories) {
      //looping through them to put them in the array
      for (var i = 0; i < dbCategories.length; i++) {
        cats.push(dbCategories[i].dataValues);
      }
      if (req.isAuthenticated()) {
        res.render("post", {
          msg: "Post Creation",
          username: req.user.username,
          categories: cats
        });
      } else {
        res.send("You need to be logged in to make a post!");
      }
    });
    //checks if the user is logged in and renders the form if they are
    
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
  });
  
  app.get("/category", function (req, res) {
    res.render("category");
  });

  app.get("/:categoryName", function(req, res) {
    var categoryPosts = [];
    db.Categories.findAll(
      {
        where: {name: req.params.categoryName},
        include: [db.Post]
      }
    ).then(function(dbPosts) {
      for(var i = 0; i < dbPosts[0].dataValues.Posts.length; i++){
        categoryPosts.push(dbPosts[0].dataValues.Posts[i].dataValues);
      }
      res.render("index", {posts: categoryPosts});
    });
  });

  app.get("/:id", function (req, res) {
    db.Post.findOne(
      {
        where: {id: req.params.id},
        include: [
          {
            model: db.User,
            attributes: ["username"]
          }
        ]
      }
    ).then(function(dbPost) {
      res.render("detail", {data: dbPost.dataValues});
    });
    
  });

  app.get("/success", function (req, res) {
    res.send("Success!");
  });

  app.get("/failure", function (req, res) {
    res.send("failure");
  });
};

