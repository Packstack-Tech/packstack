'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('items', 'measured_weight', {
                    type: Sequelize.DECIMAL(10, 2)
                }, { transaction: t }),
                queryInterface.addColumn('items', 'height', {
                    type: Sequelize.DECIMAL(10, 2),
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('items', 'width', {
                    type: Sequelize.DECIMAL(10, 2),
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('items', 'length', {
                    type: Sequelize.DECIMAL(10, 2),
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('items', 'dimensions_unit', {
                    type: Sequelize.ENUM(['in', 'cm']),
                    defaultValue: 'in'
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('items', 'measured_weight', { transaction: t }),
                queryInterface.removeColumn('items', 'height', { transaction: t }),
                queryInterface.removeColumn('items', 'width', { transaction: t }),
                queryInterface.removeColumn('items', 'length', { transaction: t }),
                queryInterface.removeColumn('items', 'dimensions_unit', { transaction: t })
            ])
        })
    }
};
