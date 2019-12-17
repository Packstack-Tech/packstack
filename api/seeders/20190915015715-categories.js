'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {
                name: 'Uncategorized',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Pack',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Shelter',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sleep System',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Water System',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cookware',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Toiletries',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Electronics',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Clothing',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Footwear',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Consumables',
                exclude_weight: true,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Misc.',
                exclude_weight: false,
                level: 'SYSTEM',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
