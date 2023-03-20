const database = require("../models");

class EnrollmentController {

  static async getAllEnrollments(request,response){
    try {
      const allEnrollments = await database.Enrollments.findAll();
      return response.status(200).json(allEnrollments);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async getEnrollmentById(request,response){
    const { id } = request.params;
    try {
      const enrollmentFound = await database.Enrollments.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!enrollmentFound){
        return response.status(400).json({ message: `No one is found` });
      }

      return response.status(200).json(enrollmentFound);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }
  
  static async addEnrollment(request,response){
    const { initial_date, teacher_id, level_id } = request.body;
    try {
      const result = await database.Enrollments.create({
        initial_date, teacher_id, level_id 
      });
      return response.status(200).json({ message: `Enrollment added! ID:${result.id}` });
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async updateEnrollment(request,response){
    const { id } = request.params;
    const { initial_date, teacher_id, level_id } = request.body;
    try {
      const enrollmentFound = await database.Enrollments.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!enrollmentFound){
        return response.status(400).json({ message: `No Enrollment is found with id ${id} to update`});
      }

      await database.Enrollments.update({
        initial_date, teacher_id, level_id
      },{
          where: {
            id: Number(id)
          }
      });

      const enrollmentUpdated = await database.Enrollments.findOne({
        where: {
         id: Number(id)
        }  
      });

      return response.status(200).json(enrollmentUpdated);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async deleteEnrollment(request,response){
    const { id } = request.params;
    try {
      const enrollmentFound = await database.Enrollments.findOne({
       where: {
        id: Number(id)
       }  
      });

      if (!enrollmentFound){
        return response.status(400).json({message:`No Enrollment is found with id ${id} to delete`});
      }

      await database.Enrollments.destroy({
        where: {
         id: Number(enrollmentFound.id)
        }  
      });
      return response.status(200).json({message: `Enrollment ${id} deleted!`});
    } catch (error){
      return response.status(500).json(error.message);
    }
  }
}
module.exports = EnrollmentController;