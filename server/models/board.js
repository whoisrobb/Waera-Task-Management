const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        BoardID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        BoardName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.TEXT
        }
    });

    Board.associate = (models) => {
        Board.belongsTo(models.User, { through: 'CreatorUserID' });
        Board.hasMany(models.List);
    };

    return Board;
});