module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    name: DataTypes.STRING
  },{freezeTableName: true});

  Categories.associate = function(models) {
    Categories.hasMany(models.Post, {});
  };
  return Categories;
};
