export const weight_types = {
    OUNCES: 'oz',
    POUNDS: 'lbs',
    GRAMS: 'g',
    KILOGRAMS: 'kg'
};

export const length_types = {
    INCHES: 'in',
    CENTIMETERS: 'cm'
};

const item = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING(500)
        },
        manufacturer: {
            type: DataTypes.STRING(200)
        },
        weight: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        measured_weight: {
            type: DataTypes.DECIMAL(10, 2)
        },
        weight_unit: {
            type: DataTypes.ENUM(Object.values(weight_types)),
            defaultValue: weight_types.OUNCES
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        width: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        height: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        length: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        dimensions_unit: {
            type: DataTypes.ENUM(Object.values(length_types)),
            defaultValue: length_types.INCHES
        },
        product_url: {
            type: DataTypes.STRING(500)
        },
        copied: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        notes: {
            type: DataTypes.STRING(500)
        },
    });

    Item.associate = models => {
        models.Item.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

        models.Item.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'Category' });

        models.Item.belongsToMany(models.Pack, {
            through: models.PackItem,
            foreignKey: 'itemId',
            otherKey: 'packId'
        })
    };

    return Item;
};

module.exports = item;
