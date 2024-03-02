const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        CommentID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        CommentText: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Card);
        Comment.belongsTo(models.User, { foreignKey: 'CommentorID' });
    };

    return Comment;
});