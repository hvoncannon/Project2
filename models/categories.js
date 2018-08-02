module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define("Categorie", {
    name: DataTypes.STRING
  });

  Categories.associate = function(models) {
    Categories.hasMany(models.Posts, {});
  };
  return Categories;
};
