module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  Users.associate = function(models) {
    Users.hasMany(models.Post, {});
    Users.hasMany(models.Comment, {});
  };
  return Users;
};