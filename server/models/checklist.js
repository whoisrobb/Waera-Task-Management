const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Checklist = sequelize.define('Checklist', {
        ChecklistID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        ChecklistName: {
            type: DataTypes.STRING
        }
    });

    Checklist.associate = (models) => {
        Checklist.hasMany(models.ChecklistItem);
    };

    return Checklist;
});