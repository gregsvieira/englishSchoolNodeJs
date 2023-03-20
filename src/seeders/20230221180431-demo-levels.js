'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Levels', [{
      description_level: 'basic',
      createdAt: new Date(),
      updatedAt: new Date()			
    },
    {
      description_level: 'intermediate',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description_level: 'advanced',
      createdAt: new Date(),
      updatedAt: new Date()
    } ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Levels', null, {});
  }
};
