const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
        CardID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        CardName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.TEXT
        },
        DueDate: {
            type: DataTypes.DATE
        }
    });

    Card.associate = (models) => {
        Card.hasMany(models.Attachment);
        Card.hasMany(models.Comment);
        Card.hasMany(models.Checklist);
        Card.belongsTo(models.List);
        Card.belongsToMany(models.Label, { through: 'CardLabels' });
    };

    return Card;
});