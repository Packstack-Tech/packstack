'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('categories', 'level', {
            type: Sequelize.STRING(10),
            defaultValue: 'USER',
            allowNull: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('categories', 'level');
    }
};