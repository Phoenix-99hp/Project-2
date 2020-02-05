// Create the Pet model
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        // Create a column for the comment text. The text cannot be null or blank.
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // Not sure if the below section is correct or necessary yet. 
    Comment.associate = function (models) {
        // A Comment must belong to a User and a Pet
        // A Comment can't be created without a User and a Pet due to the foreign key not allowing null. 
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Comment.belongsTo(models.Pet, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment;
};