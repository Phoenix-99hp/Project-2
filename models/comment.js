module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    type: DataTypes.STRING,
    allowNull: true
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Person, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
