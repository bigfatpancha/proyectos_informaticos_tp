'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Doctors', [
        {
            user_id: 2, //ghouse
            specialty_id: 1, //clinica
            enrollment: 'MN 1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 3, //rfavaloro
            specialty_id: 2, //cardiologia
            enrollment: 'MN 2',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 4, //jbatista
            specialty_id: 4, //Traumatologia
            enrollment: 'MN 3',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 5, //jdoe
            specialty_id: 1, //clinica
            enrollment: 'MN 4',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 6, //grimolo
            specialty_id: 5, //Dermatologia
            enrollment: 'MN 5',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], {});    
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Doctors', null, {});
    }
};
