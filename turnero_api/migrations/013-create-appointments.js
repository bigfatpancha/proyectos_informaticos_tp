'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Appointments', {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            doctor_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            date: {
                type: Sequelize.DATE,
                primaryKey: true
            },
            state: {
                allowNull: false,
                type: Sequelize.STRING                
            },
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
        return queryInterface.dropTable('Appointments');
    }
};