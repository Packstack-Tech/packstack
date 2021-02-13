import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres'});

const models = {
    User: sequelize.import('./user'),
    Item: sequelize.import('./item'),
    Pack: sequelize.import('./pack'),
    PackItem: sequelize.import('./packItem'),
    Category: sequelize.import('./category'),
    PassReset: sequelize.import('./passReset')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;