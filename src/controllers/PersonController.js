const database = require("../models");

class PersonController {

  static async getActivePeople(request,response){
    try {
      const activePeople = await database.People.findAll();
      return response.status(200).json(activePeople);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async getAllPeople(request,response){
    try {
      const allPeople = await database.People.scope('all').findAll();
      return response.status(200).json(allPeople);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async getPersonById(request,response){
    const { id } = request.params;
    try {
      const personFound = await database.People.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!personFound) {
        return response.status(400).json({ message: `No one found` });
      }

      return response.status(200).json(personFound);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }
  
  static async addPerson(request,response){
    const { name, active, email, role } = request.body;
    try {
      const result = await database.People.create({
        name, active, email, role
      });
      return response.status(200).json({ message: `Person ${result.name} added! ID:${result.id}` });
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async updatePerson(request,response){
    const { id } = request.params;
    const { name, active, email, role } = request.body;
    try {
      const personFound = await database.People.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!personFound){
        return response.status(400).json({ message: `No one found with id ${id} to update`});
      }

      await database.People.update({
        name, active, email, role
      },
      {
        where: {
          id: Number(id)
        }
      });

      const personUpdated = await database.People.findOne({
        where: {
         id: Number(id)
        }  
      });

      return response.status(200).json(personUpdated);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async deletePerson(request,response){
    const { id } = request.params;
    try {
      const personFound = await database.People.findOne({
       where: {
        id: Number(id)
       }  
      });

      if (!personFound){
        return response.status(400).json({message:`No one is found with id ${id} to delete`});
      }

      await database.People.destroy({
        where: {
         id: Number(personFound.id)
        }  
      });
      return response.status(200).json({message:`Person ${id} deleted!`});
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async retorePerson(request, response) {
    const { id } = request.params;
    try {
      await database.People.restore( {where: { id: Number(id)}})
      return response.status(200).json({message: `id restored!`})
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async getOneByStudentAndEnrollment(request,response){
    const { student_id, enrollment_id } = request.params;
    try {
      const oneEnrollment = await database.Enrollments.findOne({
        where: {
         id: Number(enrollment_id),
         student_id: Number(student_id)
        }  
      });
 
      if (!oneEnrollment) {
        return response.status(400).json({ message: `No one found` });
      }

      return response.status(200).json(oneEnrollment);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async createEnrollment(request,response){
    const { student_id } = request.params;
    const newEnrollment = {...request.body, student_id: Number(student_id)};

    try {
      await database.Enrollments.create(newEnrollment);

      return response.status(200).json(newEnrollment);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async updateEnrollment(request,response){
    const { student_id, enrollment_id } = request.params;
    const newInfo = {...request.body, student_id: Number(student_id)};

    try {
      await database.Enrollments.update(newInfo, {
        where: {
          id: Number(enrollment_id),
          student_id: Number(student_id)
        }
      });

      const enrollmentUpdated = await database.Enrollments.findOne({
        where: {
         id: Number(enrollment_id)
        }  
      });
      return response.status(200).json(enrollmentUpdated);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async deleteEnrollment(request,response){
    const { student_id, enrollment_id } = request.params;
    try {
      const enrollmentFound = await database.Enrollments.findOne({
       where: {
        id: Number(enrollment_id)
       }  
      });

      if (!enrollmentFound){
        return response.status(400).json({message:`No enrollment is found with id ${id} to delete`});
      }

      await database.Enrollments.destroy({
        where: {
         id: Number(enrollment_id)
        }  
      });
      return response.status(200).json({message:`Enrollment ${enrollment_id} deleted!`});
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async retoreEnrollment(request, response) {
    const { student_id, enrollment_id } = request.params;
    try {
      await database.Enrollments.restore( {
        where: { 
          id: Number(enrollment_id),
          student_id: Number(student_id)
        }
      })
      return response.status(200).json({message: `id ${enrollment_id} restored!`})
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

}

module.exports = PersonController;