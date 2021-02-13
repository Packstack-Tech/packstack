const category = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        level: {
            type: DataTypes.STRING(10),
            defaultValue: 'USER',
            allowNull: false
        },
        exclude_weight: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Category.associate = models => {
        models.Category.hasMany(models.Item, { foreignKey: 'categoryId', as: 'Category' });
    };

    return Category;
};

module.exports = category;