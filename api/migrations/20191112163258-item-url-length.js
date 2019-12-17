'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('items', 'referral_url', {
            type: Sequelize.STRING(500)
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('items', 'referral_url', {
            type: Sequelize.STRING(150)
        });
    }
};