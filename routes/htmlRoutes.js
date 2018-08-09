var db = require("../models");

module.exports = function (app) {
  app.get("/", function(req, res) {
    var postsArr = [];
    var categoryNames = [];
    db.Post.findAll(
      {
        order: [["id", "DESC"]],
        // This include joins based off of the user id and only selects the column 'username'
        // so that the server doesn't have to access the password and such
        include: [
          {
            model: db.User,
            attributes: ["username"]
          },
          {
            model: db.Categories,
            attributes: ["name"]
          }
        ]
      }).then(function (dbPost) {
      for(var i = 0; i < dbPost.length; i++) {
        postsArr.push(dbPost[i].dataValues);
      }
      db.Categories.findAll({}).then(function (dbCategories) {
        for(var i = 0; i < dbCategories.length; i++) {
          categoryNames.push({name: dbCategories[i].dataValues.name});
        }
        console.log(categoryNames);
        // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
        if (req.isAuthenticated()) {
          res.render("index", {
            posts: postsArr,
            username: req.user.username,
            categoryList: categoryNames
          });
        } else {
          res.render("index", {
            posts: postsArr,
            categoryList: categoryNames
          });
        }
      });
    });
  });
  // Load Post Page
  app.get("/post", function (req, res) {
    //empty array to place category objects in to display in dropdown when creating post
    var cats = [];
    var categoryNames = [];
    //db call to get categories
    db.Categories.findAll({}).then(function (dbCategories) {
      //looping through them to put them in the array
      for (var i = 0; i < dbCategories.length; i++) {
        cats.push(dbCategories[i].dataValues);
      }
      db.Categories.findAll({}).then(function (dbCategories) {
        for(var i = 0; i < dbCategories.length; i++) {
          categoryNames.push({name: dbCategories[i].dataValues.name});
        }
        console.log(categoryNames);
        // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
        if (req.isAuthenticated()) {
          res.render("post", {
            msg: "Post Creation",
            username: req.user.username,
            categories: cats,
            categoryList: categoryNames
          });
        } else {
          res.sendfile("loginError.html", {root: "HTML/"});
        }
      });
    });
  });

  app.get("/author", function (req, res) {
    var categoryNames = [];
    db.Categories.findAll({}).then(function (dbCategories) {
      for(var i = 0; i < dbCategories.length; i++) {
        categoryNames.push({name: dbCategories[i].dataValues.name});
      }
      console.log(categoryNames);
      // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
      if (req.isAuthenticated()) {
        res.render("author", {
          msg: "Author Creation",
          username: req.user.username,
          message: req.flash("loginFail"),
          categoryList: categoryNames
        }),console.log("!!!!!!!!!" + req.flash("loginFail"));
      } else {
        res.render("author", {
          msg: "Author Creation",
          message: req.flash("error"),
          categoryList: categoryNames
        }),console.log("!!!!!!!!!" + req.flash("error"));
      }
    });
    
  });

  app.get("/category", function (req, res) {
    var categoryNames = [];
    db.Categories.findAll({}).then(function (dbCategories) {
      for(var i = 0; i < dbCategories.length; i++) {
        categoryNames.push({name: dbCategories[i].dataValues.name});
      }
      console.log(categoryNames);
      // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
      if (req.isAuthenticated()) {
        res.render("category", {
          username: req.user.username,
          msg: "Category Creation",
          categoryList: categoryNames
        });
      } else {
        res.render("category", {
          msg: "Category Creation",
          categoryList: categoryNames
        });
      }
    });
  });
  
  app.get("/:categoryName", function(req, res) {
    var categoryPosts = [];
    var categoryNames = [];
    db.Categories.findAll(
      {
        order: [["id", "DESC"]],
        where: {name: req.params.categoryName},
        include: [db.Post]
      }
    ).then(function(dbPosts) {
      for(var i = 0; i < dbPosts[0].dataValues.Posts.length; i++){
        categoryPosts.push(dbPosts[0].dataValues.Posts[i].dataValues);
      }
      db.Categories.findAll({}).then(function (dbCategories) {
        for(var i = 0; i < dbCategories.length; i++) {
          categoryNames.push({name: dbCategories[i].dataValues.name});
        }
        console.log(categoryNames);
        // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
        res.render("index", {posts: categoryPosts, categoryList: categoryNames});
      });
      
    });
  });

  app.get("/:category/:id", function (req, res) {
    db.Post.findOne(
      {
        where: {id: req.params.id},
        include: [
          {
            model: db.User,
            attributes: ["username"]
          },
          {
            model: db.Comment,
            attributes: ["text"],
            include: [
              {
                model: db.User,
                attributes: ["username"]
              }
            ]
          }
        ]
      }
    ).then(function(dbPost) {
      var comments = dbPost.dataValues.Comments;
      var commentsToPass = [];
      var categoryNames = [];
      for(var i = 0; i < comments.length; i++) {
        var commentObj = {
          username: comments[i].dataValues.User.dataValues.username,
          comment: comments[i].dataValues.text
        };
        commentsToPass.push(commentObj);
      }
      db.Categories.findAll({}).then(function (dbCategories) {
        for(var i = 0; i < dbCategories.length; i++) {
          categoryNames.push({name: dbCategories[i].dataValues.name});
        }
        console.log(categoryNames);
        // IF user is logged in, display both the posts and username on the index page, ELSE only display posts
        if (req.isAuthenticated()) {
          res.render("detail", {data: dbPost.dataValues, comment: commentsToPass, username: req.user.username, categoryList: categoryNames});
        } else {
          res.render("detail", {data: dbPost.dataValues, comment: commentsToPass, categoryList: categoryNames});
        }
      });
    });
  });

  app.get("/success", function (req, res) {
    res.send("Success!");
  });

  app.get("/failure", function (req, res) {
    res.send("failure");
  });
};