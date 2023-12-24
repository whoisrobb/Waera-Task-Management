const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const ChecklistItem = sequelize.define('ChecklistItem', {
        ChecklistItemID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        ChecklistItemText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ItemComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    ChecklistItem.associate = (models) => {
        ChecklistItem.belongsTo(models.Checklist);
    };

    return ChecklistItem;
});