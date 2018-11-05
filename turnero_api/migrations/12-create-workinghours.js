'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('WorkingHours', {
            doctor_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },            
            day_of_week: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            from_hour: Sequelize.INTEGER,
            to_hour: Sequelize.INTEGER,
            appointment_duration: Sequelize.INTEGER,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('WorkingHours');
    }
};