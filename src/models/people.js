'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      People.hasMany(models.Classes, {
        foreignKey: 'teacher_id'
      });
      People.hasMany(models.Enrollments, {
        foreignKey: 'student_id'
      });
    }
  }
  People.init({
    name:{ 
      type: DataTypes.STRING,
      validate: {
        validateName: function(name) {
          if (name.length < 3) throw new Error('Name needs more than 3 characters')
        }
      }   
    },
    active: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{ 
          args: true,
          msg: 'invalid email'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'People',
    paranoid: true,
    defaultScope: {
      where: { active: true }
    },
    scopes: {
      all: { where: {} }
    }
  });
  return People;
};