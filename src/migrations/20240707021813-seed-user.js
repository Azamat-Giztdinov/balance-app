'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Inserting initial user balance...');
    await queryInterface.bulkInsert('Users', [{
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    console.log('Initial user balance inserted.');
  },

  async down (queryInterface, Sequelize) {
    console.log('Deleting user balances...');
    await queryInterface.bulkDelete('Users', null, {});
    console.log('User balances deleted.');
  }
};
