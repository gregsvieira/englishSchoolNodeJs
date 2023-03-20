'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Enrollments',[
      {
				status: "confirmed",
				student_id: 5,
				class_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
		  },
		  {
			  status: "confirmed",
			  student_id: 6,
			  class_id: 1,
			  createdAt: new Date(),
			  updatedAt: new Date()
	    },
		  {
		  	status: "confirmed",
		  	student_id: 7,
		  	class_id: 2,
		  	createdAt: new Date(),
		  	updatedAt: new Date()
	    },
		  {
		  	status: "confirmed",
		  	student_id: 8,
		  	class_id: 3,
			  createdAt: new Date(),
			  updatedAt: new Date()
	    },
		  {
		  	status: "canceled",
		  	student_id: 5,
		  	class_id: 2,
		  	createdAt: new Date(),
		  	updatedAt: new Date()
	    },
		  {
		  	status: "canceled",
		  	student_id: 6,
		  	class_id: 2,
		  	createdAt: new Date(),
		  	updatedAt: new Date()
		  }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enrollments', null, {});
  }
};
