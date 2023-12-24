const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        ListID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        ListName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    List.associate = (models) => {
        List.belongsTo(models.Board);
        List.hasMany(models.Card);
    };

    return List;
});