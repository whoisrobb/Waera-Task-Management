const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Attachment = sequelize.define('Attachment', {
        AttachmentID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        FileName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FilePath: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Attachment.associate = (models) => {
        Attachment.belongsTo(models.Card);
    };

    return Attachment;
});