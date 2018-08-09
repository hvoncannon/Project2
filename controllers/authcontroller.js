var exports = module.exports = {};

exports.signup = function (req, res) {
  res.render("author", {message: req.flash("error")});
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect("/");
  console.log("test");
};
