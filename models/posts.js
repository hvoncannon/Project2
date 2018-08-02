module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    upvotes: DataTypes.INTEGER,
    downvotes: DataTypes.INTEGER
  });

  Posts.associate = function(models) {
    Posts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Posts.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      }
    });
    Posts.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };
  return Posts;
};