'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Doctors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            surname: {
                type: Sequelize.STRING
            },
            specialty_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            enrollment: {
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
        return queryInterface.dropTable('Doctors');
    }
};