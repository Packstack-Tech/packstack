const packItem = (sequelize, DataTypes) => {
    const PackItem = sequelize.define('packItem', {
        quantity: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 1.0
        },
        notes: {
            type: DataTypes.STRING(1000),
            defaultValue: ''
        },
        worn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sort_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return PackItem;
};

module.exports = packItem;