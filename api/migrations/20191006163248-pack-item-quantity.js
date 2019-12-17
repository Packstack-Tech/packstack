'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('packItems', 'quantity', {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 1.0
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('packItems', 'quantity', {
            type: Sequelize.INTEGER,
            defaultValue: 1
        });
    }
};