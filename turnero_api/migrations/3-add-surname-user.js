'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'surname', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NONE",
      validate: {
        notEmpty: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'surname');
  }
};