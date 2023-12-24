const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        TeamID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        TeamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, { through: 'UserTeams' });
        Team.hasMany(models.Board);
    };

    return Team;
});