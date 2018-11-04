'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Specialties', [
        {
            name: 'Clinica',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            name: 'Cardiologia',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            name: 'Neurologia',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            name: 'Traumatologia',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            name: 'Dermatologia',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        }
        ], {});    
  },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('Specialties', null, {});
    }
};
