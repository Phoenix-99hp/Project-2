// Create the Offical model
module.exports = function (sequelize, DataTypes) {
    var Official = sequelize.define("Official", {
        // Create a column for the name. The name cannot be null or blank.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // Create a column for the official's office (aka position). The office can't be null.
        office: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Create a column for the official's photoURL. Can be null. 
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Create a column for the official's party. Can be null. 
        party: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Create a column for the official's website. Can be null. 
        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Official.associate = function (models) {
        // Associating Officials with Comments
        // When an Official is deleted, also delete any associated Comments
        Official.hasMany(models.Comment, {
            onDelete: "CASCADE"
        });
    };
    return Official;
};
