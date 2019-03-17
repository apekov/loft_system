module.exports = (sequelize, DataTypes) => {
    const news = sequelize.define('news', {
        id: {
            type: DataTypes.INTEGER,
            defaultValue: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            required: true
        },
        userId: {
            type: DataTypes.INTEGER,
            required: true
        },
        createdAt: {
            type: DataTypes.DATEONLY,
        },
        updatedAt: {
            type: DataTypes.DATEONLY,
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        theme: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        tableName: 'news',
        underscored: true,
        timestamps: false
    });
    // news.associate = (models) => {
    //     news.hasOne(models.users, {
    //         foreignKey: 'userId',
    //     });
    // };
    return news;
};