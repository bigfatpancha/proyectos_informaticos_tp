'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doctors', 'username');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doctors', 'username', {
      type: Sequelize.STRING
    });
  }
};