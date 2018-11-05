'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('WorkingHours', [
        {
            doctor_id: 1,
            day_of_week: 1,
            from_hour: 9,
            to_hour: 17,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 1,
            day_of_week: 2,
            from_hour: 9,
            to_hour: 17,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 1,
            day_of_week: 3,
            from_hour: 7,
            to_hour: 15,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 1,
            day_of_week: 4,
            from_hour: 11,
            to_hour: 19,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 1,
            day_of_week: 5,
            from_hour: 9,
            to_hour: 17,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 2,
            day_of_week: 2,
            from_hour: 9,
            to_hour: 17,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 2,
            day_of_week: 3,
            from_hour: 9,
            to_hour: 17,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            doctor_id: 3,
            day_of_week: 5,
            from_hour: 9,
            to_hour: 13,
            appointment_duration: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        },        
        ], {});    
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('WorkingHours', null, {});
    }
};
