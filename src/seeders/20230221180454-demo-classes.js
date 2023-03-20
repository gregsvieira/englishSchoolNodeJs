'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Classes',[
      {
				initial_date: "2020-02-01",
				name: "Basic of Programing Logics",
				level_id: 1,
				teacher_id: 6,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
			{
				initial_date: "2020-02-01",
				name: "Node.js Streams",
				level_id: 2,
				teacher_id: 5,
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				initial_date: "2020-02-01",
				name: "Software Architecture",
				level_id: 3,
				teacher_id: 6,
				createdAt: new Date(),
				updatedAt: new Date()			
				},
			{
				initial_date: "2020-07-01",
				name: "Backend For Frontend (BFF)",
				level_id: 3,
				teacher_id: 6,
				createdAt: new Date(),
				updatedAt: new Date()			
			}
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {});
  }
};
