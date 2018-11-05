'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doctors', 'password');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doctors', 'password', {
      type: Sequelize.STRING
    });
  }
};