'use strict';

var moment = require('moment');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Appointments', [
        {
            user_id: 1,
            doctor_id: 1,
            date: moment("28-11-2018 09:30", "DD-MM-YYYY hh:mm").toDate(),
            state: 'Activo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 1,
            doctor_id: 1,
            date: moment("28-11-2018 10:00", "DD-MM-YYYY hh:mm").toDate(),
            state: 'Activo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 1,
            doctor_id: 1,
            date: moment("28-11-2018 11:00", "DD-MM-YYYY hh:mm").toDate(),
            state: 'Activo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        ], {});    
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Appointments', null, {});
    }
};
