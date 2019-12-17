'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('items', 'copied', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }, { transaction: t }),
                queryInterface.renameColumn('items', 'description', 'product_name',
                    { transaction: t }),
                queryInterface.renameColumn('items', 'referral_url', 'product_url',
                    { transaction: t }),
                queryInterface.changeColumn('packs', 'public', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('items', 'copied', { transaction: t }),
                queryInterface.renameColumn('items', 'product_name', 'description',
                    { transaction: t }),
                queryInterface.renameColumn('items', 'product_url', 'referral_url',
                    { transaction: t }),
                queryInterface.changeColumn('packs', 'public', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                }, { transaction: t })
            ])
        })
    }
};

// UPDATE FRONTEND ***