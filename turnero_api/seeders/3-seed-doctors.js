'use strict';

var bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Doctors', [
        {
            username: 'ghouse',
            password: bcrypt.hashSync('1234', 10),
            name: 'Gregory',
            surname: 'House',
            specialty_id: 1, //clinica
            enrollment: 'MN 1',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            username: 'rfavaloro',
            password: bcrypt.hashSync('1234', 10),
            name: 'Rene',
            surname: 'Favaloro',
            specialty_id: 2, //cardiologia
            enrollment: 'MN 2',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            username: 'jbatista',
            password: bcrypt.hashSync('fakePassword', 10),
            name: 'Jorge',
            surname: 'Batista',
            specialty_id: 4, //Traumatologia
            enrollment: 'MN 3',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            username: 'jdoe',
            password: bcrypt.hashSync('fakePassword', 10),
            name: 'Jane',
            surname: 'Doe',
            specialty_id: 1, //clinica
            enrollment: 'MN 4',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            username: 'grimolo',
            password: bcrypt.hashSync('fakePassword', 10),
            name: 'Giselle',
            surname: 'Rimolo',
            specialty_id: 5, //Dermatologia
            enrollment: 'MN 5',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        }
        ], {});    
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Doctors', null, {});
    }
};
