const JsonField = require('sequelize-json');

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            defaultValue: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
        },
        surName: {
            type: DataTypes.STRING,
        },
        middleName: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        access_token: {
            type: DataTypes.STRING,
            required: true
        },
        image: {
            type: DataTypes.STRING,
        },
        permissionId: {
            type: DataTypes.INTEGER,
        },
        permission: JsonField(sequelize, 'users', 'permission')
    }, {
        freezeTableName: true,
        tableName: 'users',
        underscored: true,
        timestamps: false
    });
    users.associate = (models) => {
        users.hasMany(models.news, { foreignKey: 'userId', sourceKey: 'id' });
    };
    return users;
};