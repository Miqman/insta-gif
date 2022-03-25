'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsTo(models.Category)
    }
  }
  Post.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    vote: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(post, option){
        post.vote = 0
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};