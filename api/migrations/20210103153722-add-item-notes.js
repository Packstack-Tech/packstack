'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('items', 'notes', {
            type: Sequelize.STRING(500),
            defaultValue: ''
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('items', 'notes')
    }
};
