module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("Person", {
    name: DataTypes.STRING
  });

  Person.associate = function(models) {
    Person.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Person;
};
