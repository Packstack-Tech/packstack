'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('items', 'categoryId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'categories',
                        key: 'id'
                    }
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('items', 'categoryId', { transaction: t })
            ])
        })
    }
};
