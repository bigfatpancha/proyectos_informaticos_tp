'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Specialties', [
        {
            name: 'Clinica',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Cardiologia',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Neurologia',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Traumatologia',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Dermatologia',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], {});    
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Specialties', null, {});
    }
};
