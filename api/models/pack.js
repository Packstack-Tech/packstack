const duration_units = {
    DAYS: 'Days',
    WEEKS: 'Weeks',
    MONTHS: 'Months'
};

const gender = {
    MALE: 'm',
    FEMALE: 'f'
};

const pack = (sequelize, DataTypes) => {
    const Pack = sequelize.define('pack', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(2000),
        },
        duration: {
            type: DataTypes.INTEGER
        },
        duration_unit: {
            type: DataTypes.ENUM(Object.values(duration_units)),
            defaultValue: duration_units.DAYS
        },
        temp_range: {
            type: DataTypes.STRING
        },
        season: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM(Object.values(gender))
        },
        userId: {
            type: DataTypes.INTEGER
        }
    });

    Pack.associate = models => {
        models.Pack.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

        models.Pack.belongsToMany(models.Item, {
            through: models.PackItem,
            foreignKey: 'packId',
            otherKey: 'itemId'
        })
    };

    return Pack;
};

module.exports = pack;