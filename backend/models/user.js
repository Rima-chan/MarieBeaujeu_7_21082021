'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Publication, { onDelete: 'CASCADE', hooks:true });
      models.User.hasMany(models.Comment, { onDelete: 'CASCADE', hooks:true });
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,

    username: DataTypes.STRING,
    service: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};