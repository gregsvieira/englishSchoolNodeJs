const database = require("../models");

class ClassController {

  static async getAllClasses(request,response){
    try {
      const allClasses = await database.Classes.findAll();
      return response.status(200).json(allClasses);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async getClassById(request,response){
    const { id } = request.params;
    try {
      const classFound = await database.Classes.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!classFound){
        return response.status(400).json({ message: `No one is found` });
      }

      return response.status(200).json(classFound);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }
  
  static async addClass(request,response){
    const { name, initial_date, teacher_id, level_id } = request.body;
    try {
      const newClass = await database.Classes.create({
        name, initial_date, teacher_id, level_id 
      });
      return response.status(200).json({ message: `Class ${newClass.name}added! ID:${newClass.id}` });
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async updateClass(request,response){
    const { id } = request.params;
    const { name, initial_date, teacher_id, level_id } = request.body;
    try {
      const classFound = await database.Classes.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!classFound){
        return response.status(400).json({ message: `No Class is found with id ${id} to update`});
      }

      await database.Classes.update({
        name, initial_date, teacher_id, level_id
      },{
          where: {
            id: Number(id)
          }
      });

      const classUpdated = await database.Classes.findOne({
        where: {
         id: Number(id)
        }  
      });

      return response.status(200).json(classUpdated);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async deleteClass(request,response){
    const { id } = request.params;
    try {
      const classFound = await database.Classes.findOne({
       where: {
        id: Number(id)
       }  
      });

      if (!classFound){
        return response.status(400).json({message:`No class is found with id ${id} to delete`});
      }

      await database.Classes.destroy({
        where: {
         id: Number(classFound.id)
        }  
      });
      return response.status(200).json({message: `Class ${id} deleted!`});
    } catch (error){
      return response.status(500).json(error.message);
    }
  }
}

module.exports = ClassController;