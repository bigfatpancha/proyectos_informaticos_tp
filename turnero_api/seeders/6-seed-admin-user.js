'use strict';

var bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      surname: 'User',
      password: bcrypt.hashSync('fakePassword1', 10),
      role: 'Admin',
      email: 'admin@test.com',
      phone: '15-1234-5678',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', {
      where: {
        role: 'Admin'
      }
    }, {});
  }
};
