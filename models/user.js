'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
// const  {Profile, Post} = require('../models/index.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static findProfile(Profile, Post, userLogin){
      return User.findOne({
        include: [Profile, Post],
        where: {
            id: userLogin
        }
    })
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Username Cannot be blank`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Email cannot be blank`
        },
        isEmail:{
          msg: `email must be an email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: `Password cannot be blank`
        },
        min: {
          args: 8,
          msg: `Password minimum length is 8`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user,option){
        let salt = bcrypt.genSaltSync(7);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};