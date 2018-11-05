'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doctors', 'surname');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doctors', 'surname', {
      type: Sequelize.STRING
    });
  }
};