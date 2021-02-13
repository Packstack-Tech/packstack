import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres'});

const models = {
    User: require('./user')(sequelize, Sequelize.DataTypes),
    Item: require('./item')(sequelize, Sequelize.DataTypes),
    Pack: require('./pack')(sequelize, Sequelize.DataTypes),
    PackItem: require('./packItem')(sequelize, Sequelize.DataTypes),
    Category: require('./category')(sequelize, Sequelize.DataTypes),
    PassReset: require('./passReset')(sequelize, Sequelize.DataTypes)
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;