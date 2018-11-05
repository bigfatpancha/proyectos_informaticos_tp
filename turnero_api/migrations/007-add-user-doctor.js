'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doctors', 'user_id', Sequelize.INTEGER);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doctors', 'user_id');
  }
};