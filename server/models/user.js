const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require('bcrypt');


module.exports = ((sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        UserID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ProfilePictureURL: {
            type: DataTypes.STRING
        },
        Role: {
            type: DataTypes.STRING
        },
    }, {
        hooks: {
            beforeCreate: async function (user) {
                const salt = await bcrypt.genSalt();
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        }
    });

    User.prototype.isValidPassword = async function (password) {
        return await bcrypt.compare(password, this.Password);
    };

    User.associate = (models) => {
        User.hasMany(models.Board, { foreignKey: 'CreatorUserID' });
        User.hasMany(models.Comment, { foreignKey: 'CommentorID' });
        User.belongsToMany(models.Team, { through: 'UserTeams' });
    };

    return User;
});