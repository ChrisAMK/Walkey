module.exports = function (sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        breed: DataTypes.STRING
    });

    Pet.associate = function (models) {
        Pet.belongsTo(models.User, {
            foreignKey: {

            }
        });
    };
    return Pet;
}