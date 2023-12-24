const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Label = sequelize.define('Label', {
        LabelID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        LabelName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Label.associate = (models) => {
        Label.belongsToMany(models.Card, { through: 'CardLabels' });
    };

    return Label;
});