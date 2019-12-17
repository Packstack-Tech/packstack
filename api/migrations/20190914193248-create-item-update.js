'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('items', 'manufacturer', {
            type: Sequelize.STRING(200)
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('items', 'manufacturer');
    }
};