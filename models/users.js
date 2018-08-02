module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  Users.associate = function(models) {
    Users.hasMany(models.Posts, {});
    Users.hasMany(models.Comments, {});
  };
  return Users;
};