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
      name: 'Test',
      surname: 'User',
      password: bcrypt.hashSync('fakePassword', 10),
      email: 'email@test.com',
      phone: '15-1234-5678',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
        name: 'Gregory',
        surname: 'House',
        password: bcrypt.hashSync('1234', 10),
        email: 'ghouse@test.com',
        phone: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    {
        name: 'Rene',
        surname: 'Favaloro',
        password: bcrypt.hashSync('1234', 10),
        email: 'rfavaloro@test.com',
        phone: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    {
        name: 'Jorge',
        surname: 'Batista',
        password: bcrypt.hashSync('fakePassword', 10),
        email: 'jbatista@test.com',
        phone: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    {
        name: 'Jane',
        surname: 'Doe',
        password: bcrypt.hashSync('fakePassword', 10),
        email: 'jdoe@test.com',
        phone: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    {
        name: 'Giselle',
        surname: 'Rimolo',
        password: bcrypt.hashSync('fakePassword', 10),
        email: 'grimolo@test.com',
        phone: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    }], {});    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
