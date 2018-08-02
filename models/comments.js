module.exports = function (sequelize, DataTypes) {
  var Comments = sequelize.define("Comment", {
    text: DataTypes.TEXT,
    upvotes: DataTypes.INTEGER,
    downpvotes: DataTypes.INTEGER
  });

  Comments.associate = function(models) {
    Comments.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Comments.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comments;
};