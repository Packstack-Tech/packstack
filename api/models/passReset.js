const passReset = (sequelize, DataTypes) => {
    const PassReset = sequelize.define('passReset', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        callback_id: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    return PassReset;
};

module.exports = passReset;