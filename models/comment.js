module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
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
