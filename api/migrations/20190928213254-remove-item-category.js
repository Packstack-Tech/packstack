'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('items', 'category');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('items', 'category', {
            type: DataTypes.INTEGER,
            allowNull: false
        });
    }
};