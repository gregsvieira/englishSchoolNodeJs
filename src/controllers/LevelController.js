const database = require("../models");

class LevelController {

  static async getAllLevels(request,response){
    try {
      const allLevels = await database.Levels.findAll();
      return response.status(200).json(allLevels);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
  
  static async getLevelById(request,response){
    const { id } = request.params;

    try {
      const levelFound = await database.Levels.findOne({
        where: {
          id: Number(id)
        }
      });

      if (!levelFound) {
        return response.status(400).json({ message: `No one found with id ${id}` })
      }
      return response.status(200).json(levelFound);

    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async addLevel(request,response){
    const { description_level } = request.body;
    try {
      const result = await database.Levels.create({
        description_level
      });
      console.log(result)
      return response.status(200).json({ message: `Level ${result.description_level} added! ID:${result.id}` });
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async updateLevel(request,response){
    const { id } = request.params;
    const { description_level } = request.body;
    try {
      const levelFound = await database.Levels.findOne({
        where: {
         id: Number(id)
        }  
      });
 
      if (!levelFound){
        return response.status(400).json({ message: `No one is found with id ${id} to update`});
      }

      await database.Levels.update({
        description_level
      },{
        where: {
          id: Number(id)
        }
      });

      const levelUpdated = await database.Levels.findOne({
        where: {
         id: Number(id)
        }  
      });

      return response.status(200).json(levelUpdated);
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

  static async deleteLevel(request,response){
    const { id } = request.params;
    try {
      const levelFound = await database.Levels.findOne({
       where: {
        id: Number(id)
       }  
      });

      if (!levelFound){
        return response.status(400).json({message:`No one is found with id ${id} to delete`});
      }

      await database.Levels.destroy({
        where: {
         id: Number(levelFound.id)
        }  
      });
      return response.status(200).json({message:`Level ${id} deleted!`});
    } catch (error){
      return response.status(500).json(error.message);
    }
  }

}

module.exports = LevelController;