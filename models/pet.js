// Create the Pet model
module.exports = function (sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
        // Create a column for the name. The name cannot be null or blank.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // Create a column for the species. The species can be null.
        species: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Create a column for the pet's location. Can't be null, otherwise how would the user adopt the pet?
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Pet.associate = function (models) {
        // Associating Pets with Comments
        // When a Pet is deleted, also delete any associated Comments
        Pet.hasMany(models.Comment, {
            onDelete: "CASCADE"
        });
    };
    return Pet;
};
