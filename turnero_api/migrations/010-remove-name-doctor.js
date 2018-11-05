'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doctors', 'name');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doctors', 'name', {
      type: Sequelize.STRING
    });
  }
};