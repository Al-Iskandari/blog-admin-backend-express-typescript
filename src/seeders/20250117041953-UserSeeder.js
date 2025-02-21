'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
        firstName: 'Joni',
        lastName: 'Iskandar',
        email: 'jhoniimx@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('People', null, {});
     
  }
};
